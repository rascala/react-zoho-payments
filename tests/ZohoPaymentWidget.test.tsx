import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { WidgetExample } from "./ZohoPaymentWidget.Example";
import { getPaymentSessionId } from "./httpHelpers";

const amount = "5";
it(
	"renders correctly",
	async () => {
		const [ok, zohoData] = await getPaymentSessionId(amount);
		expect(ok).toBe(true);
		const { zohoApiKey, zohoAccountId, paymentsSessionId } = zohoData;
		const screen = render(
			<WidgetExample
				amount={amount}
				zohoApiKey={zohoApiKey}
				zohoAccountId={zohoAccountId}
				paymentsSessionId={paymentsSessionId}
			/>,
		);

		expect(await screen.findByText("Valid payments_session_id")).toBeDefined();

		expect(
			await screen.findByTitle("Checkout - Powered by Zoho Payments"),
		).toBeDefined();
	},
	{ timeout: 40000 },
);
