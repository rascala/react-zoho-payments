"use server";

const scopes =
	"ZohoPay.payments.READ,ZohoPay.payments.CREATE,ZohoPay.refunds.READ,ZohoPay.refunds.CREATE";
const grantTypes = "client_credentials";

async function getAccessToken() {
	const zohoClientId = process.env.ZOHO_CLIENT_ID;
	const zohoRefreshToken = process.env.ZOHO_REFRESH_TOKEN;
	const zohoClientSecret = process.env.ZOHO_CLIENT_SECRET;
	const baseUrl = "https://accounts.zoho.in/oauth/v2/token";
	const url = `${baseUrl}?refresh_token=${zohoRefreshToken}&client_id=${zohoClientId}&client_secret=${zohoClientSecret}&scope=${scopes}&grant_type=${grantTypes}`;
	const resp = await fetch(url, { method: "POST" });
	console.log(`ZOHO: get_access_token: status_code=${resp.status}`);
	const respJson = await resp.json();
	console.log(respJson);
	if (resp.status !== 200) {
		return [
			false,
			"Could not initiate ZOHO payment. Please try later or contact support@eleanorcare.ai",
		];
	}
	// # sample response
	// # {
	// #   "access_token":"1000.xxxxx.xxxx",
	// #   "scope":"ZohoPay.payments.READ ZohoPay.payments.CREATE ZohoPay.refunds.CREATE ZohoPay.refunds.READ",
	// #   "api_domain":"https://www.zohoapis.in",
	// #   "token_type":"Bearer",
	// #   "expires_in":3600
	// # }
	const accessToken = respJson.access_token;
	return [true, accessToken];
}

async function getPaymentSessionId(amount: string) {
	const [ok, accessTokenOrError] = await getAccessToken();
	if (!ok) {
		return [false, accessTokenOrError];
	}
	const accessToken = accessTokenOrError;
	if (typeof accessToken !== "string") {
		return [
			false,
			"Could not initiate ZOHO payment. Please try later or contact support@eleanorcare.ai",
		];
	}
	const accountId = process.env.NEXT_PUBLIC_ZOHO_PAYMENTS_ACCOUNT_ID;
	const url = `https://payments.zoho.in/api/v1/paymentsessions?account_id=${accountId}`;
	const headers = {
		// biome-ignore lint/style/useNamingConvention: <explanation>
		Authorization: `Zoho-oauthtoken ${accessToken}`,
		"content-type": "application/json",
	};
	const body = JSON.stringify({
		amount: amount,
		currency: "INR",
		// biome-ignore lint/style/useNamingConvention: <explanation>
		meta_data: [{ key: "Key1", value: "Value1" }],
	});

	const resp = await fetch(url, { method: "post", headers, body });
	console.log(`ZOHO: get_payment_session_id: status_code=${resp.status}`);
	const respJson = await resp.json();
	console.log(respJson);

	if (resp.status !== 200 && resp.status !== 201) {
		return [
			false,
			"Could not initiate ZOHO payment. Please try later or contact support",
		];
	}
	// # sample response
	// # {
	// #     "code": 0,
	// #     "message": "success",
	// #     "payments_session": {
	// #         "payments_session_id": "2000000012001",
	// #         "currency": "INR",
	// #         "amount": "100.50",
	// #         "created_time": 1708950672,
	// #         "meta_data": [
	// #             {
	// #                 "key": "Key1",
	// #                 "value": "Value1"
	// #             }
	// #         ]
	// #     }
	// # }
	if (respJson.message !== "success") {
		return [
			false,
			"Could not initiate ZOHO payment. Please try later or contact support@eleanorcare.ai",
		];
	}
	return [true, respJson.payments_session?.payments_session_id];
}

export { getPaymentSessionId };
