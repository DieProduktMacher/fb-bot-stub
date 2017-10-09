# fb-bot-stub

Stub Implementation for a facebook messenger bots using [`serverless`](https://serverless.com) deployment to AWS.

## Prerequisites

* one facebook page per `stage` (must not be published when developing)
* one facebook app configured with *Messenger* per `stage` (can be test app)
* facebook page access token generated for the app in the Messenger configuration per `stage`
* create `.env` file:
```
FB_MESSENGER_VERIFICATION_TOKEN=verfification-token-of-your-choosing
FB_PAGE_ACCESS_TOKEN=token-generated-for-app
```

**NOTES:**

* For `serverless` deployment to AWS you need an AWS account and user credentials for programmatic access with admin permissions set up
* If you want different settings for local development and the deployment `stage` also create `.env.local` containing settings for local development.
* If you want to have more than one deployment `stage` you should consider using the [`serverless-env-generator`](https://www.npmjs.com/package/serverless-env-generator) and do not use a manually edited `.env` file.

## Local developmenent

Start the local development server (powered by [`serverless-local-dev-server`](https://www.npmjs.com/package/serverless-local-dev-server)):

```
npm start
```

Use something like [`forward`](https://forwardhq.com/) making you local server accessible on the internet:

```
forward 5005
```

Then configure the webhook for the facebook app using `https://<your-forward-subdomain>.fwd.wf/http/fbmessenger` using the `FB_MESSENGER_VERIFICATION_TOKEN` set in your `.env` or`.env.local` file

## Deployment

You may want to edit the `serverless.yml` to your liking for customizing
* `service` name
* AWS `region`
* AWS `profile` name
* etc.

or for adding additional
* resources
* AWS Lambda functions

You should not (have) change the AWS Lambda function configurations for the messenger bot (`FBMessengerBotMain`, `FBMessengerBotVerify`).

To deploy to the default `stage` run:
```
npm run deploy
```
or if you want to use a different `stage`
```
npm run deploy -- --stage production
```

**Notes:**

* the default deployment `stage` is set to `development`
* the default AWS `profile` name used for deployment is set to `<service-name>-<stage>`, e.g. `fb-bot-stub-development`
* so you need to have an AWS `profile` with that name configured using the appropriate AWS user credentials

## TODOs

* Implement your own logic
* etc.
