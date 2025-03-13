"use client";
import { useCallback, useState } from "react";
import { ZohoPaymentWidget } from "../src/ZohoPaymentWidget";

interface IProps {
	amount: string;
	paymentsSessionId: string;
	zohoApiKey: string;
	zohoAccountId: string;
}

function WidgetExample({
	amount,
	zohoApiKey,
	zohoAccountId,
	paymentsSessionId,
}: IProps) {
	const [messages, setMessages] = useState<{ time: string; event: string }[]>(
		[],
	);

	// sample callbacks
	const onEvent = useCallback((event: object) => {
		setMessages((messages) => [
			...messages,
			{
				time: new Date().toTimeString().slice(0, 8),
				event: JSON.stringify(event),
			},
		]);
	}, []);

	return (
		<div className="min-h-screen min-w-screen items-center justify-items-center p-8 pb-20 sm:p-20">
			{typeof zohoApiKey !== "string" ? (
				<div className="rounded border-2 border-black bg-red-200 px-4 py-2">
					Invalid api key. Please check your NEXT_PUBLIC_ZOHO_PAYMENTS_API_KEY
					env
				</div>
			) : typeof zohoAccountId !== "string" ? (
				<div className="rounded border-2 border-black bg-red-200 px-4 py-2">
					Invalid account id. Please check your
					NEXT_PUBLIC_ZOHO_PAYMENTS_ACCOUNT_ID env
				</div>
			) : typeof paymentsSessionId !== "string" ? (
				<div className="rounded border-2 border-black bg-red-200 px-4 py-2">
					Invalid paymentsSessionId. The widget can only be shown after a valid
					paymentsSessionId is generated
				</div>
			) : (
				<>
					<div className="rounded border-2 border-black bg-red-200 px-4 py-2">
						Valid payments_session_id
					</div>
					<ZohoPaymentWidget
						businessName="Acme Company Ltd."
						businessDesc="Acme Rocket v2.0"
						amountInRs={amount}
						apiKey={zohoApiKey}
						accountId={zohoAccountId}
						paymentsSessionId={paymentsSessionId}
						buyerName={"Mr. Coyote"}
						buyerEmail={"mr.coyote@me.com"}
						show={true}
						onEvent={onEvent}
					/>
				</>
			)}
		</div>
	);
}

export { WidgetExample };
