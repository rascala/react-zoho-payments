# react-zoho-payments
Unofficial reactjs wrapper for Zoho payments widget.
This uses manually modified version of the raw js code to handle via reactjs

## Repository and docs
https://github.com/rascala/react-zoho-payments

## References
- Zoho payments api: https://www.zoho.com/in/payments/api/v1/introduction/#overview
- Zoho payments widget: https://www.zoho.com/in/payments/api/v1/widget/#integrate-widget. 

## Usage
Make sure you have a recent enough node version.

install the library
```
npm i react-zoho-payments
# or
pnpm i react-zoho-payments
# or
yarn add react-zoho-payments
```
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
	onEvent={onEvent}
/>
```

## Documentation
`Notes`: Only show the widget after you have payments_session_id from Zoho Payments API. The widget immediately starts up and tries to load a iframe for the payment with the payments_session_id in its url
## Props
- `show`: boolean (required)
  prop to show the zoho payments widget

  `Note`: Only set this to true after required props are filled
  If set to show without valid api-key, account-id or payments_session_id, the widget will not boot up correctly     
- `businessName`: string (required)

  Will be visible at the top of the widget as a title

  TODO - add screenshot

  `Note`: The name/account which will appear in their UPI app or banking page will be the one you have registered with Zoho payments

  This text will appear only in the Zoho Payments Widget

  (not on their HDFC page or GooglePay app or PhonePe app etc, which will have the registered organization name and account)
- `businessDesc`: string (required)

  Will be visible under businessName as a subtitle
  TODO - add screenshot
- `buyerName`: string (required)

  Name of the buyer when confirmation is sent
- `buyerEmail`: string (required)

  email address of the buyer to which confirmation will be sent
- `amountInRs`: string (required)

  Payment amount in rupees as a string

  `Note`: amount given should match the amount sent to Zoho api when getting payments_session_id 
- `apiKey`: string (required)

  Zoho Payments api key 
- `accountId`: string (required)

  Zoho Payments account ID

  TODO - add screenshot
- `paymentsSessionId`: string (required)

  payments_sesssion_id from Zoho. Is usually a string of 16 digits

  refer: https://www.zoho.com/in/payments/api/v1/payment-session/#create-payment-session
- `onWidgetBooted`: callback (optional)

  callback function when widget is shown

  `Note`: event is received twice from the raw widget, I am not sure why
- `onWidgetBootFailed`: callback (optional)

  callback function when widget fails to show
- `onOpen`: callback (optional)

  callback function when `open` event is passed
- `onCharge`: callback (optional)

  callback function when `charge` event is passed.

  This is a successful payment charged.
  Will return a payload of type

  `{payment_id: string, message: string}`

  You can use this payment_id to confirm payment status from your backend

  `Note`: Set `show` to `false` in this callback to close the widget
- `onClose`: callback (optional)

  callback function when `close` event is passed.

  This is invoked when widget is closed
- `onNeedsSCA`: callback (optional)

  callback function when `needs_sca` event is passed.

  This is the case when user chooses a payment method which 
  needs a `Secure Customer Authentication`(OTP via SMS/email) confirmation.
- `onSCASuccess`: callback (optional)

  callback function when customer enters correct OTP
- `onSCAFailure`: callback (optional)

  callback function when customer enters incorrect OTP
- `onChargeValidationError`: callback (optional)

  TODO - figure out when this event is called
- `onChargeThreedsError`: callback (optional)

  TODO - figure out when this event is called
- `onError`: callback (optional)

  TODO - unused now. will be used as a catch-all errors in the future.
- `onEvent`: callback (optional)

  callback function called on all events(use this for logging or debugging).

  Check examples/ for usage on how this is used to show event logs.

## Example
Refer to https://github.com/rascala/react-zoho-payments/examples/nextjs15-zoho-payments

Full-stack NextJs 15 project
- with server functions to get access_token, payments_session_id
- `/` url which you can use to make payments and view event logs/errors
Refer to readme in the folder for more details on setting env variables up and running the dev server


# TODOs
- more complete docs for props
- example with overriding styles(inline instead of default which is a full-page modal-style widget)
- check which nodejs versions are supported
