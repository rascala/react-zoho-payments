# WIP
# react-zoho-payments
Unofficial reactjs wrapper for Zoho payments widget

Usage
import the widget
```
import { ZohoPaymentWidget } from "react-zoho-payments";
```

Use it as a component in your react code
```
<ZohoPaymentWidget
	businessName="Business Name"
	businessDesc="Monthly/Yearly Subscription"
	buyerName={"Buyer Name"}
	buyerEmail={"Buyer Email"}
	amountInRs={"5"}
	apiKey={zohoApiKey}
	accountId={zohoAccountId}
	paymentsSessionId={paymentsSessionId}
	show={showPaymentWidget}
	// optional callbacks
	onWidgetBooted={onWidgetBooted}
	onWidgetBootFailed={onWidgetBootFailed}
	onOpen={onOpen}
	onCharge={onCharge}
	onClose={onClose}
	onNeedsSCA={onNeedsSCA}
	onSCASuccess={onPaymentSuccess}
	onSCAFailure={onSCAFailure}
	onChargeValidationError={onChargeValidationError}
	onChargeThreedsError={onChargeThreedsError}
	onError={onError}
	onOtherMessage={onOtherMessage}
/>
```

# Coming soon
- docs for props
- examples folder with full-stack sample with NextJS