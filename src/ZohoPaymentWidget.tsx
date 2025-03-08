import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
	IZohoPaymentChargePayload,
	IZohoPaymentMessagePayload,
	IZohoPaymentWidgetProps,
} from "./ZohoPaymentWidget.types";
// @ts-ignore
import { zpayments } from "./zohopayments.min";

const MAX_Z_INDEX = 2147483647;

const ZohoPaymentWidget = (props: IZohoPaymentWidgetProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const spinnerRef = useRef<HTMLDivElement>(null);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [zpayObj, setZpayObj] = useState<any | null>(null);

	const handleMessage = useCallback(
		(e: { data: { action: string; payload: object } }) => {
			console.log("message");
			console.log(e.data);
			props.onEvent?.(e.data ?? {});
			const action = e.data?.action;
			const payload = e.data?.payload;
			switch (action) {
				case "close":
					props.onClose?.();
					break;
				case "charge":
					props.onCharge?.(payload as IZohoPaymentChargePayload);
					break;
				case "open":
					props.onOpen?.();
					break;
				case "widget_booted":
					props.onWidgetBooted?.();
					break;
				case "widget_boot_failed":
					props.onWidgetBootFailed?.();
					break;
				case "needs_sca":
					props.onNeedsSCA?.(payload as IZohoPaymentMessagePayload);
					break;
				case "sca_success":
					props.onSCASuccess?.(payload as IZohoPaymentMessagePayload);
					break;
				case "sca_failure":
					props.onSCAFailure?.(payload as IZohoPaymentMessagePayload);
					break;
				case "get_financial_connections_accounts":
					props.getFinancialConnectionsAccounts?.(
						payload as IZohoPaymentMessagePayload,
					);
					break;
				case "send_financial_connections_accounts":
					props.sendFinancialConnectionsAccounts?.(
						payload as IZohoPaymentMessagePayload,
					);
					break;
				case "settings:module-change":
					props.settingsModuleChange?.(payload as IZohoPaymentMessagePayload);
					break;
				case "charge:validationerror":
					props.onChargeValidationError?.(
						payload as IZohoPaymentMessagePayload,
					);
					break;
				case "charge:threedserror":
					props.onChargeThreedsError?.(payload as IZohoPaymentMessagePayload);
					break;
				default:
					break;
			}
		},
		[props],
	);

	const openZPay = useCallback(() => {
		try {
			zpayObj.requestPaymentMethod(options);
		} catch (e) {
			console.error(e);
		}
	}, [zpayObj]);

	const closeZPay = useCallback(() => {
		zpayObj.close();
	}, [zpayObj]);

	const config = useMemo(
		() => ({
			// biome-ignore lint/style/useNamingConvention: <explanation>
			account_id: props.accountId,
			domain: "IN",
			otherOptions: {
				// biome-ignore lint/style/useNamingConvention: <explanation>
				api_key: props.apiKey,
			},
		}),
		[props],
	);

	useEffect(() => {
		if (zpayObj !== null) {
			return;
		}
		const zohoPayments = zpayments({
			wrapperRef: wrapperRef.current,
			backdropRef: backdropRef.current,
			spinnerRef: spinnerRef.current,
		});
		try {
			window.addEventListener("message", handleMessage);
			const zpObj = new zohoPayments(config);
			setZpayObj(zpObj);
		} catch (e) {
			console.error(e);
		}
	}, [config, zpayObj, handleMessage]);

	const options = useMemo(
		() => ({
			amount: props.amountInRs,
			// biome-ignore lint/style/useNamingConvention: <explanation>
			currency_code: "INR",
			// biome-ignore lint/style/useNamingConvention: <explanation>
			payments_session_id: props.paymentsSessionId,
			// biome-ignore lint/style/useNamingConvention: <explanation>
			session_id: props.paymentsSessionId,
			// biome-ignore lint/style/useNamingConvention: <explanation>
			currency_symbol: "₹",
			business: props.businessName,
			description: props.businessDesc,
			address: {
				name: props.buyerName,
				email: props.buyerEmail,
			},
		}),
		[props],
	);

	const [isWidgetShown, setIsWidgetShown] = useState(false);
	useEffect(() => {
		if (props.show && !isWidgetShown && zpayObj !== null) {
			openZPay();
			setIsWidgetShown(true);
		}
	}, [isWidgetShown, zpayObj, openZPay, props.show]);

	useEffect(() => {
		if (!props.show && isWidgetShown && zpayObj !== null) {
			zpayObj.close();
			setIsWidgetShown(false);
		}
	}, [isWidgetShown, zpayObj, props.show]);

	return (
		<div>
			<div ref={wrapperRef} />
			<div
				ref={backdropRef}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					height: "100%",
					width: "100%",
					background: "#040a22",
					opacity: 0,
					transition: "opacity 200ms ease-in",
					zIndex: `${MAX_Z_INDEX - 1} !important`,
				}}
			/>
			<div
				ref={spinnerRef}
				style={{
					position: "fixed",
					top: "25%",
					left: "50%",
					padding: "10px",
					width: "52px",
					height: "52px",
					borderRadius: "50%",
					backgroundColor: "white",
					opacity: 0,
					transition: "opacity 300ms ease-in",
					zIndex: `${MAX_Z_INDEX} !important`,
					transform: "translateX(-50%)",
				}}
			/>
		</div>
	);
};

export {
	ZohoPaymentWidget,
	type IZohoPaymentChargePayload,
	type IZohoPaymentMessagePayload,
	type IZohoPaymentWidgetProps,
};
