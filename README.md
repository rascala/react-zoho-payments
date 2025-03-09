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
- <h3>show: boolean (required)</h3>
  prop to show the zoho payments widget

  `Note`: Only set this to true after required props are filled

  If set to show without valid api-key, account-id or payments_session_id, the widget will not boot up correctly

- <h3>businessName: string (required)</h3>

  Will be visible at the top of the widget as a title(highlighted inside red-rectangle below)
  
  <img width="300" alt="zoho-payments-name" src="https://github.com/user-attachments/assets/45e044f3-2cb9-4860-9f41-4bcb9da249d4" />

- <h3>businessDesc: string (required)</h3>

  Will be visible under businessName as a subtitle(highlighted inside red-rectangle below)
  
  <img width="300" alt="zoho-payments-desc" src="https://github.com/user-attachments/assets/2ad66070-588b-43c5-9d66-81206c2e6339" />

- <h3>buyerName: string (required)</h3>

  Name of the buyer when confirmation is sent
- <h3>buyerEmail: string (required)</h3>

  email address of the buyer to which confirmation will be sent
- <h3>amountInRs: string (required)</h3>

  Payment amount in rupees as a string. Will be shown in widget(highlighted inside red-rectangle below)
  
  <img width="300" alt="zoho-payments-amount" src="https://github.com/user-attachments/assets/24b7197c-8b74-41b8-ad2f-9665cc91b660" />

  `Note`: amount given should match the amount sent to Zoho api when getting payments_session_id 
- <h3>apiKey: string (required)</h3>

  Zoho Payments api key 
- <h3>accountId: string (required)</h3>

  Zoho Payments account ID.

  Can be found in your Zoho payments dashboard.

  Click on the dropdown on your user icon on the top right

  (position is in the red rectangle below)

  <img width="300" alt="zoho-payments-account-id" src="https://github.com/user-attachments/assets/69dde41f-2538-4f83-8840-a6f0ccfd87d6" />

- <h3>paymentsSessionId: string (required)</h3>

  payments_sesssion_id from Zoho. Is a string of 16 digits
- <h3>onWidgetBooted: callback (optional)</h3>

  callback function when widget is shown

  `Note`: event is received twice from the raw widget, I am not sure why.
- <h3>onWidgetBootFailed: callback (optional)</h3>

  callback function when widget fails to show
- <h3>onOpen: callback (optional)</h3>

  callback function when `open` event is passed
- <h3>onCharge: callback (optional)</h3>

  callback function when `charge` event is passed.

  This is a successful payment charged.
  Will return a payload of type

  `{payment_id: string, message: string}`

  You can use this payment_id to confirm payment status from your backend
 
  `Note`: Set `show` to `false` in this callback to close the widget. The widget does not autoclose(in my version at least)
- <h3>onClose: callback (optional)</h3>

  callback function when `close` event is passed.

  This is invoked when widget is closed
- <h3>onNeedsSCA: callback (optional)</h3>

  callback function when `needs_sca` event is passed.

  This is the case when user chooses a payment method which 
  needs a `Secure Customer Authentication`(OTP via SMS/email) confirmation.
- <h3>onSCASuccess: callback (optional)</h3>

  callback function when customer enters correct OTP
- <h3>onSCAFailure: callback (optional)</h3>

  callback function when customer enters incorrect OTP
- <h3>onChargeValidationError: callback (optional)</h3>

  TODO - figure out when this event is called
- <h3>onChargeThreedsError: callback (optional)</h3>

  TODO - figure out when this event is called
- <h3>onError: callback (optional)</h3>

  TODO - unused now. will be used as a catch-all errors in the future.
- <h3>onEvent: callback (optional)</h3>

  callback function called on all events(use this for logging or debugging).

  Check examples/ for usage on how this is used to show event logs.

## Example
Refer to https://github.com/rascala/react-zoho-payments/examples/nextjs15-zoho-payments

Full-stack NextJs 15 project
- with server functions to get access_token, payments_session_id
- `/` url which you can use to make payments and view event logs/errors
Refer to readme in the folder for more details on setting env variables up and running the dev server


# TODOs
- add test with fetching payments_session_id. Zoho Payments does not have sandbox-mode yet, so cannot add successfull payment test.
- more complete docs for props
- example with overriding styles(inline instead of default which is a full-page modal-style widget)
- check which nodejs versions are supported
