export interface IZohoPaymentMessagePayload {
	code: string;
	message: string;
}
export interface IZohoPaymentChargePayload {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	payment_id: string;
	message: string;
}
export interface IZohoPaymentWidgetProps {
	show: boolean;

	apiKey: string;
	accountId: string;
	paymentsSessionId: string;

	businessName: string;
	businessDesc: string;
	amountInRs: string;

	buyerName: string;
	buyerEmail: string;

	setStatus?: (status: string) => void;

	onWidgetBooted?: () => void;
	onWidgetBootFailed?: () => void;

	onOpen?: () => void;
	onCharge?: (payload: IZohoPaymentChargePayload) => void;
	onClose?: () => void;

	onNeedsSCA?: (payload: IZohoPaymentMessagePayload) => void;
	onSCASuccess?: (payload: IZohoPaymentMessagePayload) => void;
	onSCAFailure?: (payload: IZohoPaymentMessagePayload) => void;

	onChargeValidationError?: (payload: IZohoPaymentMessagePayload) => void;
	onChargeThreedsError?: (payload: IZohoPaymentMessagePayload) => void;

	onError?: (payload: IZohoPaymentMessagePayload) => void;
	onEvent?: (event: object) => void;

	getFinancialConnectionsAccounts?: (
		payload: IZohoPaymentMessagePayload,
	) => void;
	sendFinancialConnectionsAccounts?: (
		payload: IZohoPaymentMessagePayload,
	) => void;
	settingsModuleChange?: (payload: IZohoPaymentMessagePayload) => void;
}
