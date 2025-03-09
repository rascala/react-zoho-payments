This is a sample full-stack nextjs-15 [Next.js](https://nextjs.org) project using react-zoho-payments [`react-zoho-payments`](https://github.com/rascala/react-zoho-payments).

## Setup
Set your env variables up like
```
# file name: .env.development.local

# used by the backend(server function) to get access token
ZOHO_CLIENT_ID="<your-client-id-here>"
ZOHO_CLIENT_SECRET="<your-client-secret-here>"
ZOHO_REFRESH_TOKEN="<your-refresh-token-here>"

# used by server function to get payments_session_id and by client-side to launch the widget
NEXT_PUBLIC_ZOHO_PAYMENTS_ACCOUNT_ID="<your-account-id>"
NEXT_PUBLIC_ZOHO_PAYMENTS_API_KEY="<your-api-key-here>"
```

## Getting Started

Make sure you have `nodejs 23.8.0` as specified in .tools-version file

Install the dependencies

```bash
pnpm i
# or
npm i 
# or
yarn
```

Then, run the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

Open the url printed in the console(usually http://localhost:3000, if this port is occupied it will start at port :3001 etc)

Sample recording below

https://github.com/user-attachments/assets/826443b6-b2bc-4d3c-926d-d40ea6431501

## Server functions

The server functions in server/actions.ts have two api calls

- Get the access-token(in a real-project, you should cache this for the length of the expiry time).

Refer: https://www.zoho.com/in/payments/api/v1/oauth/#overview
- Get the payments_session_id. Refer https://www.zoho.com/in/payments/api/v1/payment-session/#create-payment-session

The page.tsx uses this to show the ZohoPaymentWidget __after__ we have the payments_session_id

You can view responses for server functions in the terminal(where your ran `npm run dev` etc)

## Pages
- `/`: has the default mode of the widget where it opens up full-screen

## Debugging
- If stuck at the loading screen:

  Inspect your network and check if the iframe being loaded by zoho-payments is valid. The url for the iframe should have a valid payments_session_id(16 digit number) in it.

## References
- Zoho payments api: https://www.zoho.com/in/payments/api/v1/introduction/#overview
- Zoho payments widget: https://www.zoho.com/in/payments/api/v1/widget/#integrate-widget. The react-zoho-payments library is a wrapper around a modified https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js
