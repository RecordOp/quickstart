# <img src="./recordOpLogo.png" height="60px" align="center" alt="Recordop logo"> RecordOp Quickstart

Welcome to the RecordOp Quickstart application, a full-stack Typescript application using a React client and an Express server.

Here, we demonstrate using the RecordOp API to fetch data from an Electronic Health Record using FHIR and presenting retrieved patient information in a React frontend. Our objective is to showcase the most straightforward and consistent means of fetching data and expanding details with FHIR and RecordOp.

## Table of Contents

-   [1. Clone the repository](#1-clone-the-repository)
-   [2. Prerequisites](#2-prerequisites)
-   [3. Run the quickstart](#3-run-the-quickstart)
    -   [Running the Server](#running-the-server)
    -   [Running the Client](#running-the-client)
-   [Sandbox Credentials](#sandbox-credentials)
-   [Get Support](#get-support)

## 1. Clone the repository

```bash
git clone https://github.com/RecordOp/quickstart
cd quickstart
```

## 2. Prerequisites

We assume you have installed [npm](https://www.npmjs.com/get-npm) and are running node >= v16.

We also assume you have a [RecordOp account](https://dashboard.recordop.com) and an app registered with at least the following scopes: Patient, Practitioner, Organization.

## 3. Run the Quickstart

### Running the Server

**_1. First install server dependencies._**

```bash
$ cd server
$ npm i
```

**_2. Then, setup the server environment variables._**

Copy the provided `server/.env.sample` file into `server/.env` and set the required environment variables:

-   `PORT`: Port to start the Express server on
-   `RECORDOP_API_ENDPOINT`: The RecordOp API endpoint
-   `RECORDOP_API_KEY`: Your API key obtained from the RecordOp Dashboard
-   `RECORDOP_APP_ID`: Your app ID obtained from the RecordOp Dashboard
-   `RECORDOP_CALLBACK_URL`: The URL that the user will be redirected to after they grant data access through RecordOp SecureShare. RecordOp appends the SecureShare session id (`sid`) and patient FHIR id (`pfid`) to the callbackUrl as query parameters upon redirection to the callbackUrl from SecureShare.

The sample environment variables `PORT`, `RECORDOP_API_ENDPOINT`, and `RECORDOP_CALLBACK_URL` can be left as is to run the sample application.

**_3. Finally, start the server._**

-   Run `npm run build`
-   Run `npm run start` or `npm run dev`

The server will be accessible at `http://localhost:{process.env.PORT}`.

### Running the Client

**_1. First install client dependencies._**

```bash
$ cd client
$ npm i
```

**_2. Then, set the client environment variables._**

Copy the provided `client/.env.sample` file into `client/.env` and ensure the required environment variables are set:

-   `VITE_SERVER_URL`: The URL of the Express server

The sample environment variable `VITE_SERVER_URL` can be left as is to run the sample application.

**_3. Finally, start the client._**

-   Run `npm run build`
-   Run `npm run preview` or `npm run dev`

The client will be accessible at `http://localhost:5173`

## Sandbox Credentials

Use any of the sandbox patient credentials found [here](https://www.recordop.com/docs/get-started/sandbox) to simulate patient EHR authorization.

## Get support

If you find a bug, have questions, or want to suggest a change please contact us at [support@recordop.com](mailto:support@recordop.com) or create an [issue](https://github.com/RecordOp/quickstart/issues).
