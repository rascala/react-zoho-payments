"use client";
import { useCallback, useEffect, useState } from "react";
import { ZohoPaymentWidget } from "react-zoho-payments";
import { getPaymentSessionId } from "../../server/actions";

const zohoApiKey = process.env.NEXT_PUBLIC_ZOHO_PAYMENTS_API_KEY;
const zohoAccountId = process.env.NEXT_PUBLIC_ZOHO_PAYMENTS_ACCOUNT_ID;

export default function Home() {
	const amount = "5";
	const [fetchingPaymentSessionId, setFetchingPaymentSessionId] =
		useState(false);
	const [paymentSessionIdError, setPaymentSessionIdError] = useState<
		string | null
	>();
	const [paymentsSessionId, setPaymentsSessionId] = useState<string | null>();
	const [showPaymentWidget, setShowPaymentWidget] = useState(false);
	const [messages, setMessages] = useState<{ time: string; event: string }[]>(
		[],
	);

	useEffect(() => {
		setFetchingPaymentSessionId(true);
		setPaymentSessionIdError(null);
		getPaymentSessionId(amount)
			.then((sessionIdData) => {
				if (sessionIdData.length > 0 && sessionIdData[0] === true) {
					const sessionId = sessionIdData[1];
					setPaymentsSessionId(sessionId);
				} else {
					setPaymentSessionIdError(JSON.stringify(sessionIdData));
				}
			})
			.catch((err) => setPaymentSessionIdError(err))
			.finally(() => setFetchingPaymentSessionId(false));
	}, []);

	// sample callbacks
	const onPaymentSuccess = useCallback((payload: object) => {
		console.log("onPaymentSuccess: ", payload);
	}, []);
	const onCharge = useCallback((payload: object) => {
		console.log("onCharge: ", payload);
		setShowPaymentWidget(false);
	}, []);
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
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
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
				) : paymentSessionIdError ? (
					<div className="rounded border-2 border-black bg-red-200 px-4 py-2">
						Error getting payments_session_id. Please check your server logs
					</div>
				) : fetchingPaymentSessionId ? (
					<div className="rounded border-2 border-black bg-blue-200 px-4 py-2">
						Fetching payments_session_id
					</div>
				) : typeof paymentsSessionId !== "string" ? (
					<div className="rounded border-2 border-black bg-red-200 px-4 py-2">
						Invalid paymentsSessionId. The widget can only be shown after a
						valid paymentsSessionId is generated
					</div>
				) : showPaymentWidget ? (
					typeof paymentsSessionId !== "string" ? (
						<div>Loading...</div>
					) : (
						<div>
							<ZohoPaymentWidget
								businessName="Business Name"
								businessDesc="Monthly/Yearly Subscription"
								amountInRs={"5"}
								apiKey={zohoApiKey}
								accountId={zohoAccountId}
								paymentsSessionId={paymentsSessionId}
								buyerName={"Mr. Sid"}
								buyerEmail={"mr.sid@me.com"}
								show={showPaymentWidget}
								onSCASuccess={onPaymentSuccess}
								onCharge={onCharge}
								onEvent={onEvent}
							/>
						</div>
					)
				) : (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						className="btn btn-primary rounded bg-primary"
						style={{
							backgroundColor: "black",
							color: "white",
							padding: "10px",
						}}
						onClick={() => setShowPaymentWidget(true)}
					>
						Show Widget
					</div>
				)}
				<div className="w-full">
					<div className="text-lg">Events/Messages</div>
					<div className="text-gray-600 text-sm">
						Events/Messages from payment widget will show up here
					</div>
					<div className="scroll mt-2 flex h-96 w-full flex-col items-center gap-4 rounded border py-4">
						{messages.length === 0 ? (
							<div className="flex h-full items-center justify-center">
								No messages yet
							</div>
						) : (
							messages.map(({ time, event }, idx) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div key={idx} className="flex w-full border-b px-4 pb-2">
									<div className="text-gray-600 text-sm">{time}</div>{" "}
									<div className="pl-6 font-semibold text-gray-600">
										{event}
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
