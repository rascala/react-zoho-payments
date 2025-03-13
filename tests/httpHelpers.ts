const zohoApiKey = process.env.NEXT_PUBLIC_ZOHO_PAYMENTS_API_KEY;
const zohoAccountId = process.env.NEXT_PUBLIC_ZOHO_PAYMENTS_ACCOUNT_ID;

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
	const respJson = await resp.json();
	if (resp.status !== 200) {
		return [
			false,
			"Could not initiate ZOHO payment. Please try later or contact support@eleanorcare.ai",
		];
	}
	const accessToken = respJson.access_token;
	return [true, accessToken];
}

async function getPaymentSessionId(amount: string) {
	console.log(
		`--- PARENT_TEST_VALUE = ${JSON.stringify(process.env.PARENT_TEST_VALUE)}`,
	);
	console.log(
		`--- STATIC_TEST_VALUE = ${JSON.stringify(process.env.STATIC_TEST_VALUE)}`,
	);
	console.log(`--- TEST_VALUE = ${JSON.stringify(process.env.TEST_VALUE)}`);
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
		// biome-ignore lint/style/useNamingConvention: conforming to Zoho api expectation
		meta_data: [{ key: "Key1", value: "Value1" }],
	});

	const resp = await fetch(url, { method: "post", headers, body });
	const respJson = await resp.json();

	if (resp.status !== 200 && resp.status !== 201) {
		return [
			false,
			"Could not initiate ZOHO payment. Please try later or contact support",
		];
	}
	if (respJson.message !== "success") {
		return [
			false,
			"Could not initiate ZOHO payment. Please try later or contact support@eleanorcare.ai",
		];
	}
	return [
		true,
		{
			zohoApiKey,
			zohoAccountId,
			paymentsSessionId: respJson.payments_session?.payments_session_id,
		},
	];
}

export { getPaymentSessionId };
