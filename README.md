# violet-proxy-server
Proxy Server in Express JS for the Violet API

## Getting Started with the Express Proxy Server

Learn the basics of starting an express server that lets you connect your client to the Violet API through an authenticated manner. This ensures that your client-side applications do not expose secret keys.

<Warning>
  **Disclaimer**: This is not a production version of the express proxy server.
  This is just a simple proxy for you to run Violet on your local environment.
  DO NOT deploy as is.
</Warning>

## Before you Begin

Ensure you have the following installed on your local environment before running our sample applications.

- Git ([Mac download](https://git-scm.com/download/mac)) ([Windows Download](https://git-scm.com/download/win))
  - You can use [brew]() for this: `brew install git`
- node ([download](https://nodejs.org/en/download/))
  - You can use [brew]() for this: `brew install node`

## Glossary

Some of the terminology used in this guide is specific to Violet. Please refer to these definitions for new concepts that are introduced.

- Express Proxy Server — This is the proxy server we will be starting up that connects to the Violet API.
- Client — This is the web or iOS application you are building and the code that the user interacts with. This client will call the proxy server.
- Merchant — The store or brand. The gallery is currently powered by PUBLIC merchants, for demo purposes. In your version, this would be powered by private relationships that you build with brands.
- Offers — A product from a specific Merchant. Since multiple brands can sell the same item, Violet lets you interact with Offers. When viewing the gallery of the sample app, you are interacting with Offers.

## Onboarding Guide

### Creating an application in Violet

Violet Applications provide you with the necessary credentials and tools to invoke our APIs and build your new system. Violet applications are the entry point to any system built on Violet and manage merchants you've connected to.

1. Sign up at channel.violet.io/signup or login at channel.violet.io/login
2. Click 'Create App'
3. Name your Application
4. Save your App Id and App Secret

You can read more about Violet applications [here.](/guides/quickstart/create-a-violet-application)

### Cloning the repositories from Github

Check out the `violet-proxy-server` repository through the following command:

```text Text
HTTP:
git clone https://github.com/violetio/violet-proxy-server.git

SSH:
git clone git@github.com:violetio/violet-proxy-server.git
```

## Logging in with Postman or curl to fetch your refresh token

Fetch your refresh token using the App Id and App Secret you created in the first step through the following command:

```bash Curl
curl --location --request POST 'https://sandbox-api.violet.io/v1/login' \
--header 'X-Violet-App-Secret: <REPLACE WITH YOUR APP SECRET>' \
--header 'X-Violet-App-Id: <REPLACE WITH YOUR APP ID>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": "<REPLACE WITH YOUR APP PASSWORD>",
    "username": "<REPLACE WITH YOUR USERNAME>"
}'
```

Copy this refresh token and save it for later. You will need it to start the proxy server.

## Starting the Application

1. Navigate to the source directory of the package you cloned.
2. Install all dependencies
3. Create a `.env` file in the root directory of the git repository (this will be something like `~/path_to_git_repo`) and replace the information below with your app credentials.
4. Run the Proxy server from the root directory of the git repository (this will be something like `~/path_to_git_repo`) through the following command:
5. Your proxy server is now running on http://localhost:8020

```text Text
APP_SECRET=<REPLACE_WITH_YOUR_APP_SECRET>
APP_ID=<REPLACE_WITH_YOUR_APP_SECRET>
API_ENDPOINT=https://sandbox-api.violet.io
REFRESH_TOKEN=<REPLACE_WITH_YOUR_REFRESH_TOKEN_FROM_ABOVE>
```

## Making calls to the Violet API

To make authenticated calls to the Violet API, all you need to do is call the proxy server with `/api/<violet_endpoint>` from your client. For example, to call our GET Merchants API:

```bash Curl
curl --location --request GET 'http://localhost:8020/api/merchants'
```

For a full list of the Violet APIs, please refer to our API reference.
