# Tpay React Native SDK

[![npm version](https://badge.fury.io/js/react-native-tpay.svg)](https://badge.fury.io/js/react-native-tpay)
![Static Badge](https://img.shields.io/badge/min_android_sdk-23-blue?logo=android&label=Min%20Android%20SDK)
![Static Badge](https://img.shields.io/badge/min_ios_sdk-12.0+-blue?logo=apple&label=iOS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## About
This SDK allows your app to make payments with Tpay.
Documentation is available [here](https://tpay-com.github.io/tpay-react-native/).

| Library             | Version                       |
| ------------------- | ----------------------------- |
| npm                 | 1.3.8                         |
| Minimum Android SDK | 23 (Android 6.0, Marshmallow) |
| Minimum iOS version | 12.0                          |

> [!warning]
> For this SDK to work you will need `client_id` and `client_secret` tokens. You can find in [merchant's panel](https://panel.tpay.com).
>
> If you are partner, you can obtain them in your merchant partner account. For detailed
> instructions how to do that or how to create such an account
> check [this site](https://docs-api.tpay.com/en/merchant-accounts/).

> [!tip]
> To be able to test the SDK properly,
> use [mock data](https://support.tpay.com/sprzedawca/srodowisko-testowe-sandbox).


## Install

```sh
npm install react-native-tpay
```

## Configuration

> [!note]
> In this section we will provide examples for each configuration to the TpayConfiguration class
> you will be able to make.

> [!important]
> Beneath you will find all configurations that are **MANDATORY**.

### Initialization

At first, you have to configure your app to be able to make any requests by providing SDK info about
your merchant account.
Info about `client_id` and `client_secret` you will find in your merchant's panel at `Integration -> API`.

```typescript
new Merchant(
  new MerchantAuthorization(
    'client_id',
    'client_secret'
  ),
  TpayEnvironment.sandbox,
  new CertificatePinningConfiguration('ssl_pinning'),
  'blik_alias',
  new WalletConfiguration(
    new GooglePayConfiguration('merchant_id'),
    new ApplePayConfiguration('merchant_id', 'country_code')
  )
);
```

### Environment

Tpay SDK provides two types of environments you can use in your app:

* `TpayEnvironment.sandbox` - used only for tests and in stage/dev flavor.
* `TpayEnvironment.production` - used for production flavors.

### Payment methods

For users to be able to use a specific payment method you have declare it in the configuration.

| Method                      | Description |
|-----------------------------| ----------- |
| BLIK                        | [Web docs](https://docs-api.tpay.com/en/payment-methods/blik/) |
| Pbl **(Pay-By-Link)**       | [Web docs](https://docs-api.tpay.com/en/payment-methods/pbl/) |
| Card                        | [Web docs](https://docs-api.tpay.com/en/payment-methods/cards/) |
| DigitalWallets              | [GOOGLE_PAY](https://docs-api.tpay.com/en/payment-methods/google-pay/) ; [APPLE_PAY](https://docs-api.tpay.com/en/payment-methods/apple-pay/) |
| InstallmentPayments         | [RATY_PEKAO](https://docs-api.tpay.com/en/payment-methods/installments/) |
| DeferredPayments **(BNPL)** | [PAY_PO](https://docs-api.tpay.com/en/payment-methods/bnpl/) |

```typescript
new PaymentMethods(
  [PaymentMethod.card, PaymentMethod.blik, PaymentMethod.transfer],
  [DigitalWallet.googlePay, DigitalWallet.applePay],
  [InstallmentPayment.ratyPekao, InstallmentPayment.payPo],
);
```

#### Card

If you decide to enable the credit card payment option, you have to provide SSL certificates.

> [!tip]
> You can find SSL public key on you merchant panel at section `Integrations -> API -> Cards API`.

> [!tip]
> You can find public key on you merchant panel:
> - Acquirer Elavon: `Credit card payments -> API`
> - Acquirer Pekao: `Integrations -> API -> Cards API`

```typescript
new CertificatePinningConfiguration('ssl_pinning')
```

#### Google Pay configuration

In order to be able to use Google Pay method you have to provide your `merchant_id` to the SDK.

> [!tip]
> Your login name to the merchant panel is your merchant id.

```typescript
  new WalletConfiguration(
    new GooglePayConfiguration('merchant_id'),
  )
```

#### Apple Pay configuration

In order to be able to use Apple Pay method you have to provide your `merchant_id` and `country_code` to the SDK.

> [!important]
> To obtain the merchantIdentifier, follow these steps:
> 1. Log in to your Apple Developer account.
> 2. Navigate to the `Certificates, Identifiers & Profiles` section.
> 3. Under `Identifiers,` select `Merchant IDs.`
> 4. Click the `+` button to create a new Merchant ID.
> 5. Fill in the required information and associate it with your app's Bundle ID.
> 6. Once created, the merchant identifier can be found in the list of Merchant IDs.
> 7. For more details, please follow [Apple Pay documentation](https://developer.apple.com/documentation/passkit/apple_pay/setting_up_apple_pay).

```typescript
  new WalletConfiguration(
    new ApplePayConfiguration('merchant_id', 'country_code')
  )
```

### Languages

Tpay SDK lets you decide what languages will be available in the Tpay's screen and which one of them
will be preferred/default.

Right now, SDK allows you to use 2 languages:

* `Language.pl` - polish
* `Language.en` - english

```typescript
new Languages(Language.pl, [Language.en, Language.pl]);
```

### Merchant details

As a merchant, you can configure how information about you will be shown.
You can set up your `display name`, `city/headquarters` and `regulations link`.
You can choose to provide different copy for each language, or simply use one for all.

```typescript
new MerchantDetails(
  [
    new LocalizedString(Language.pl, 'Sklep'),
    new LocalizedString(Language.en, 'Merchant'),
  ],
  [
    new LocalizedString(Language.pl, 'Warszawie'),
    new LocalizedString(Language.en, 'Warsaw'),
  ],
  [
    new LocalizedString(Language.pl, 'polish URL'),
    new LocalizedString(Language.en, 'english URL'),
  ]
);
```

> [!warning]
> Every `LocalizedString` value **MUST NOT** be an empty string!
> Otherwise this may cause an app crash.

### Summary
Beneath you will find how a complete configuration should look like.

```typescript
const merchant = new Merchant(
  new MerchantAuthorization(
    'client_id',
    'client_secret'
  ),
  TpayEnvironment.sandbox,
  new CertificatePinningConfiguration('ssl_pinning'),
  'blik_alias',
  new WalletConfiguration(
    new GooglePayConfiguration('merchant_id'),
    new ApplePayConfiguration('merchant_id', 'country_code')
  )
);

const merchantDetails = new MerchantDetails(
  [
    new LocalizedString(Language.pl, 'Sklep'),
    new LocalizedString(Language.en, 'Merchant'),
  ],
  [
    new LocalizedString(Language.pl, 'Warszawie'),
    new LocalizedString(Language.en, 'Warsaw'),
  ],
  [
    new LocalizedString(Language.pl, 'polish URL'),
    new LocalizedString(Language.en, 'english URL'),
  ]
);

const languages = new Languages(Language.pl, [Language.en, Language.pl]);

const paymentMethods = new PaymentMethods(
  [PaymentMethod.card, PaymentMethod.blik, PaymentMethod.transfer],
  [DigitalWallet.googlePay, DigitalWallet.applePay],
  [InstallmentPayment.ratyPekao, InstallmentPayment.payPo]
);

const configuration = new TpayConfiguration(
  merchant,
  merchantDetails,
  languages,
  paymentMethods
);

await configure(configuration);
```

### Android

Tpay UI module is a native Android bottom sheet. In order to handle system backpress events you need
to add the following code to your Activity.

```kotlin
import com.tpay.util.TpayBackpressUtil;

class MainActivity : ReactActivity() {
  override fun onBackPressed() {
    if (TpayBackpressUtil.isModuleVisible) {
      TpayBackpressUtil.onBackPressed()
    } else {
      super.onBackPressed()
    }
  }
}
```

#### Proguard/R8

If you are using Proguard/R8 in your project, you have to add the following rules to the
`android/app/proguard-rules.pro` file, to keep Tpay SDK classes.

```proguard
# Keep all Tpay SDK classes
-keep class com.tpay.sdk.** { *; }
```

### iOS

When integrating the Tpay payment module into your app, it’s important to ensure that the necessary permissions are correctly set up to ensure a smooth user experience.
The module allows the user to automatically fill the credit card form for secure payment processing. This feature requires you to setup the “Privacy - Camera Usage Description”.

### React Native CLI

Integration Steps:
1. Open your project’s `Info.plist` file.
2. Add the key-value pair for the “Privacy - Camera Usage Description” permission, explaining the purpose of camera access. Clearly state that the camera is used to facilitate the automatic filling of the credit card form for secure payment processing.

Example:
```
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to automatically fill the credit card form for secure payment processing.</string>
```

### Expo Workflow

Integration Steps:
1. Open your project’s `app.json` file.
2. Add the key-value pair for the “Privacy - Camera Usage Description” permission, explaining the purpose of camera access. Clearly state that the camera is used to facilitate the automatic filling of the credit card form for secure payment processing.
3. Add it under `ios -> infoPlist -> NSCameraUsageDescription`

Example:
```json
"ios": {
  "infoPlist": {
    "NSCameraUsageDescription": "We need access to your camera to automatically fill the credit card form for secure payment processing."
  }
},
```

## Handling payments

Tpay SDK provides two ways of handling payments:

- `Official SDK screens` - you can use Tpay's official screens where you just need to provide "soft"
  information, like price, description or payer info.
- `Screenless` - you can use screenless functionalities, where you set callbacks for payments and
  display all necessary information on your own screens.

## Official SDK screens

To make integration with the SDK faster, we created 3 types of sheets that can be used to handle
payments:

* `SingleTransaction` - the most simple screen where the user can choose any payment method and proceed with it,
* `Tokenization` - screen that handles generating payment token from the credit card,
* `TokenPayment` - screen that handles payment with previously created token for credit card,

### SingleTransaction

SingleTransaction flow opens a UI module and allows the customer to pick one of the defined payment methods.
This method requires setting up a few things in order to fulfill payment:

* `amount` - simply the price of the transaction
* `description` - transaction description
* `hiddenDescription` (optional) - description visible only to the merchant
* `payerContext` - information about payer
  * `payer` - information about person who is making the payment
    * `name` - payer name
    * `email` - payer email
    * `phone` - payer phone number
    * `address` - payer address
      * `city` - city name
      * `countryCode` - country code in ISO 3166-1 alpha-2 format
      * `address` - street address
      * `postalCode` - postal code
  * `automaticPaymentMethods` - configuration of automatic payments
    * `tokenizedCards` - previously saved credit cards
      * `token` - card token
      * `cardTails` - last 4 digits of the card
      * `brand` - card brand
    * `blikAlias` - previously saved BLIK alias
      * `value` - alias value
      * `label` - alias label
* `notifications` - info about where the merchant should be notified about new transactions
  * `notificationEmail` - email address to send notification to
  * `notificationUrl` - URL to send notification to / URL to send tokens for tokenization

```typescript
const transaction = new SingleTransaction(
  new PayerContext(
    new Payer(
      'John Doe',
      'john.doe@example.com',
      '123456789',
      new Address(
        'Test Street1',
        'Warsaw',
        'PL',
        '00-007',
      ),
    ),
    new AutomaticPaymentMethods(
      [
        new TokenizedCard(
          'token',
          '1234',
          CreditCardBrand.visa,
        ),
        new TokenizedCard(
          'token',
          '1234',
          CreditCardBrand.mastercard,
        ),
      ],
      new BlikAlias(
        true,
        'alias value',
        'label'
      ),
    ),
  ),
  39.99,
  'transaction description',
  'hidden description',
  new Notifications(
    'https://yourdomain.com/notifications',
    'email@address'
  )
);

await startPayment(transaction);
```

> [!important]
> Tpay SDK also supports `NFC` and `camera` card scanning:
> * `NFC` - Adding card info during transaction, user can tap on the NFC button.
    Then, if NFC is enabled in the device, after holding physical card near the device, SDK will scan
    the card's data and automatically fill the form with it.
> * `Camera` - Adding card info during transaction, user can tap on the camera button.
    Then, if the camera scans card data successfully, form will be filled automatically.

#### Automatic Payments

Using `SingleTransaction` screen you can set up automatic BLIK or card payments.
Thanks to that, user will not have to enter BLIK/card data all over again each time making the
payment.

If user using a card as a payment method will opt-in saving card, on successful payment, on the link
specified as `Notifications -> url` Tpay backend will send information about the saved card token, tail and
brand.
Next, your backend has to send it to you, so you can use this info next time the same user will want
to pay with the card.
When you already have all required information, you can add `automaticPaymentMethods` to the `payerContext`.

```typescript
new AutomaticPaymentMethods(
  [
    new TokenizedCard(
      'token',
      '1234',
      CreditCardBrand.visa,
    ),
    new TokenizedCard(
      'token',
      '1234',
      CreditCardBrand.mastercard,
    ),
  ],
  new BlikAlias(
    true,
    'alias value',
    'label'
  ),
);
```

## Tokenization

Tpay SDK allows you to make credit card transactions without need of entering card's data each time.
Instead, you can create and use a token, associated with a specific card and user.

> [!important]
> There are 2 types of tokens you can use in transactions.
> * [Simple tokens](https://docs-api.tpay.com/en/tokenization/#tokenization-without-charging) -
    tokens that go with card data upon transaction,
> * [Network tokens](https://docs-api.tpay.com/en/tokenization/#tokenization-plus) -
    tokens that can be used without exposing the card details. Also, this token persists even if
    card expires and user requests a new one.

> [!warning]
> For recurring payments, you can simply use created token to make transaction without need of user
> interaction.

### Creating card token

> [!warning]
> `notificationUrl` should be the URL handled by your backend, because there will be sent token from
> the successful token creation.

```typescript
const transaction = new Tokenization(
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  'https://yourdomain.com/notifications',
);

await tokenizeCard(transaction);
```

### Token payment

If you already have card token payment, you can simply proceed with an actual tokenization
transaction.

> [!warning]
> `cardToken` is a token sent to your backend during card tokenization process.

```typescript
const transaction = new TokenPayment(
  'card_token',
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  10.99,
  'Payment description',
  'Hidden description',
  new Notifications(
    'https://yourdomain.com/notifications',
    'email@address',
  )
);

await startCardTokenPayment(transaction);
```

### Common
Each transaction with a predefined screen returns a result
that you can use to either show information to the user or e.g. log errors.

```typescript
function handleResult(result: Result) {
  if (result instanceof TokenizationCompleted) {
    // credit card was tokenized successfully
  }
  if (result instanceof TokenizationFailure) {
    // credit card was not tokenized
  }
  if (result instanceof ConfigurationSuccess) {
    // Tpay package was configured successfully
  }
  if (result instanceof ModuleClosed) {
    // User closed the Tpay UI module
  }
  if (result instanceof ValidationError) {
    // provided data is invalid
    // check error message via result.message
  }
  if (result instanceof PaymentCreated) {
    // payment completed successfully
    // read transactionId via result.transactionId
  }
  if (result instanceof PaymentCompleted) {
    // payment completed successfully
    // read transactionId via result.transactionId
  }
  if (result instanceof PaymentCancelled) {
    // payment was cancelled by user
    // result.transactionId might not exist if
    // an error occurred during payment creation
  }
  if (result instanceof MethodCallError) {
    // package error occurred
    // read error message via result.message
  }
}
```

## Screenless Payments

Screenless payments are a special type of payment functionality that gives you the whole power of
payment process, but do not limit you to using predefined Tpay screens.

### Get payment channels

To be able to use screenless functionalities you will need to know which payment methods are
available to your merchant account. To get them, you can simply call `getAvailablePaymentChannels`
method on the `TpayPlatform.instance` and set up result observer for them.

> [!warning]
> Available methods needs to be filtered by the `amount` of the transaction, because some payment
> methods have specific constraints, like minimum or maximum amount.

```typescript
async function getPaymentMethods() {
  const result = await getAvailablePaymentChannels();

  if (result instanceof PaymentChannelsSuccess) {
    result.channels.forEach(channel => {
      channel.constraints.forEach(constraint => {
        switch (constraint.type) {
          case PaymentConstraintType.amount:
            // check if your payment amount is between
            // - amountConstraint.minimum
            // - amountConstraint.maximum
            // this constraint can have:
            // - only minimum value
            // - only maximum value
            // - minimum and maximum values
            const amountConstraint = constraint as AmountPaymentConstraint;
            break;
        }

        // display payment channel if all payment constraints are satisfied
      });
    });
  }

  if (result instanceof PaymentChannelsError) {
    // handle error
  }
}
```

### Configuration

Before you run any screenless payment we do recommend setting up a function to handle specific payment results.
You will need this to be able to monitor each payment status, i.e. it's status in real time. To do so,
create a function, that will accept `ScreenlessResult` as a parameter and handle each of them.

> [!warning]
> Note that long polling mechanism will start only when it's needed:
> - `ScreenlessPaymentCreated`: when payment is created and you have to display payment URL.
> - `ScreenlessBlikAmbiguousAlias`: when payment is created and there are more than one BLIK alias registered,
    so you have to display them to the user and continue payment with selected one.

```typescript
function handleScreenlessResult(result: ScreenlessResult) {
  if (result instanceof ScreenlessPaid) {
    // payment completed successfully
  }
  if (result instanceof ScreenlessPaymentCreated) {
    // payment created, use result.paymentUrl to redirect the user to the payment page
  }
  if (result instanceof ScreenlessPaymentError) {
    // creating payment failed
  }
  if (result instanceof ScreenlessConfiguredPaymentFailed) {
    // creating payment failed because of error with:
    // - credit card data or credit card token
    // - BLIK code or BLIK alias
  }
  if (result instanceof ScreenlessBlikAmbiguousAlias) {
    // single alias has been registered multiple times, use result.aliases to let user choose desired one
  }
  if (result instanceof ScreenlessValidationError) {
    // passed data is incorrect
  }
  if (result instanceof ScreenlessMethodCallError) {
    // something went wrong with the plugin
  }
}
```

### Screenless Credit Card Payment

CreditCardPayment allows you to create payments with credit card data.

```typescript
const transaction = new CreditCardPayment(
  new CreditCard(
    'card_number',
    new ExpirationDate('12', '24'),
    '123',
    new CreditCardConfig(
      false,
      'yourstore.com',
      null,
    ),
  ),
  null,
  new PaymentDetails(
    19.99,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  )
);

const result = await screenlessCreditCardPayment(transaction);

handleScreenlessResult(result);
```

> [!warning]
> If CreditCardPayment returns `ScreenlessPaymentCreated` result, you have to handle `paymentUrl`
> sent with it and redirect user to it in order to complete the payment.

#### Tokenization

You can also Opt-in to generate a credit card token for future payments
if you want to let users pay for transactions with previously used card.
To do so, in `creditCard -> config` object, set the `shouldSave` to true.

```typescript
new CreditCardConfig(
  true,
  'yourstore.com',
  null,
)
```

> [!warning]
> Generated card token will be sent to `notificationUrl` specified in the notifications callbacks.

If you already have a credit card token, you can then set up token payment omitting credit card
info.
To do so, use `creditCardToken` instead of `creditCard` field.

```typescript
const transaction = new CreditCardPayment(
  null,
  'creadit_card_token',
  new PaymentDetails(
    19.99,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  )
);

const result = await screenlessCreditCardPayment(transaction);

handleScreenlessResult(result);
```

#### Recurring Payments

> [!important]
> Right now, ReactNative's Tpay SDK does not support recurring payments.
> If you'd like to implement them manually,
> check our [API support for recurring payments](https://docs.sandbox.tpay.com/en/first-steps/integration-methods/).

### Screenless BLIK payment
Tpay SDK let's make transactions with BLIK as well. Simply use `BLIKPayment` class.

```typescript
const blikPayment = new BlikPayment(
  'blik_code',
  null,
  new PaymentDetails(
    27.99,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  ),
);

const screenlessResult = await screenlessBLIKPayment(blikPayment);

handleScreenlessResult(screenlessResult);
```

#### BLIK Alias Payment

If you have for example a returning users and you want to make their payments with BLIK even
smoother,
you can register BLIK Alias for them, so they will only be prompted to accept payment in their
banking app,
without need of entering BLIK code each time they want to make the payment.

> [!warning]
> In order to register alias for a user/payment, you have to set `isRegistered` parameter to `false`.
> Then, a successful payment will register the alias in Tpay system
> and next time user will be able to use it.

```typescript
const blikPayment = new BlikPayment(
  '777123',
  new BlikAlias(false, '1234', 'label_1234'),
  // rest of the BLIKPayment configuration
);
```

If the payment were successful, you can assume an alias was created and can be used for the future
payments.

> [!warning]
> If you already have registered alias for a user, you can set up `isRegistered` parameter to `true`.

> [!warning]
> To be able to pay with BLIK alias, you **MUST** set the code parameter to `null`.

```typescript
const blikPayment = new BlikPayment(
  null,
  new BlikAlias(false, '1234', 'label_1234'),
  // rest of the BLIKPayment configuration
);
```

#### BLIK Ambiguous Alias Payment

Sometimes, there is a possibility for one alias to be registered more than once. For example, if
you register alias associated with one user for the multiple banks.
In such a situation, you have to fetch those aliases from Tpay API and show them to user to let him
choose one for the payment.

In BLIKPayment's call in the execute method you can get `ScreenlessBlikAmbiguousAlias`
type of result,
that will indicate that current alias was registered more than once.
This result holds all possible variations of the alias you used to start payment with in `aliases`
field.
You have to simply show them to the user, let him choose, and then use the chosen alias to retry the
payment.

```typescript
if (result instanceof ScreenlessBlikAmbiguousAlias) {
  showAmbiguousAliases(result.aliases);
}
```

> [!warning]
> In such scenario, you have to use different class to make the payment than at the beginning.
> ```typescript
> const blikPayment = new AmbiguousBlikPayment(
>   transactionId,
>   new BlikAlias(true, '1234', 'label_1234'),
>   new AmbiguousAlias('name','code',),
> );
>
> const screenlessResult = await screenlessAmbiguousBLIKPayment(blikPayment);
>
> handleScreenlessResult(screenlessResult);
> ```

> [!important]
> Right now, Tpay SDK does NOT support recurring payments with BLIK
> In order to achieve that, check
> our [API support for BLIK recurring payments](https://docs-api.tpay.com/en/payment-methods/blik/#blik-recurring-payments).

### Screenless Transfer Payment

Tpay SDK allows you to make transfer payments with bank available to your merchant account.

> [!tip]
> To get banks with their channel ids check
> the [Get Payment Channels](https://docs-api.tpay.com/en/first-steps/list-of-payment-methods/)
> section.

After your customer chooses their bank from the list, you can use it's `channelId` to make the payment.

```typescript
const transaction = new TransferPayment(
  15,
  new PaymentDetails(
    0.15,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  ),
);

const screenlessResult = await screenlessTransferPayment(transaction);

handleScreenlessResult(screenlessResult);
```

> [!warning]
> If TransferPayment returns `ScreenlessPaymentCreated` result, you have to handle `paymentUrl`
> sent with it and redirect user to it in order to complete the payment.

### Screenless Installment Payments

Tpay SDK allows you to create long term installment payments.

```typescript
const transaction = new RatyPekaoPayment(
  15,
  new PaymentDetails(
    71.15,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  ),
);

const screenlessResult = await screenlessRatyPekaoPayment(transaction);

handleScreenlessResult(screenlessResult);
```

> [!warning]
> If RatyPekaoPayment returns `ScreenlessPaymentCreated` result, you have to handle `paymentUrl`
> sent with it and redirect user to it in order to complete the payment.

### Screenless Deferred Payments

Tpay SDK allows you to create deferred payments (BNPL) using PayPo method.

> [!warning]
> For PayPo payment to work, amount of the payment must be at least 40PLN!
> For more information about PayPo payments
> check [our PayPo documentation](https://docs-api.tpay.com/en/payment-methods/bnpl/#paypo).

> [!tip]
> For sandbox, working phone number is `500123456`

```typescript
async function startScreenlessPayPoPayment() {
  const payPoPayment = new PayPoPayment(paymentDetails, payer, callbacks);
  const screenlessResult = await screenlessPayPoPayment(payPoPayment);
  handleScreenlessResult(screenlessResult);
}
```

> [!warning]
> If PayPoPayment returns `ScreenlessPaymentCreated` result, you have to handle `paymentUrl`
> sent with it and redirect user to it in order to complete the payment.

## Screenless Google Pay payment (Android only)

Google Pay payment requires a Google Pay token.

```typescript
const transaction = new PayPoPayment(
  new PaymentDetails(
    71.15,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  ),
);

const screenlessResult = await screenlessPayPoPayment(transaction);

handleScreenlessResult(screenlessResult);
```

> [!warning]
> If PayPoPayment returns `ScreenlessPaymentCreated` result, you have to handle `paymentUrl`
> sent with it and redirect user to it in order to complete the payment.

### Screenless Google Pay Payment (Android only)

Tpay SDK allows you to perform Google Pay transactions.

```typescript
const transaction = new GooglePayPayment(
  'google_pay_token',
  new PaymentDetails(
    71.15,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  ),
);

const screenlessResult = await screenlessGooglePayPayment(transaction);

handleScreenlessResult(screenlessResult);
```

> [!warning]
> If GooglePayPayment returns `ScreenlessPaymentCreated` result, you have to handle `paymentUrl`
> sent with it and redirect user to it in order to complete the payment.

> [!warning]
> Take under consideration, that choosing this option,
> you have to configure whole Google Wallet SDK and fetch Google Pay token on your own.
> For `ANDROID` system only, we provide a bit smoother way of handling Google Pay transactions with our wrappers.

#### Google Pay Utils (Android only)

If you do not want to configure whole Google Pay functionality, you can use `GooglePlayUtil` class.
It will handle all payment, with additional info in bottom sheet and send you all the needed info in
callback.

> [!important]
> To use GooglePayUtil, first, you have to configure them it.

```typescript
const config = new GooglePayUtilsConfiguration(
  19.71,
  'Test Merchant',
  'merchant_id',
  GooglePayEnvironment.test,
  null,
);

const configResult = await configureGooglePayUtils(config);

if (configResult instanceof GooglePayConfigureError) {
  // handle error
} else if (configResult instanceof GooglePayConfigureSuccess) {
  // handle success
}
```

> [!warning]
> Before you use our utils, make sure Google Pay is enabled in the device. Use `isGooglePayAvailable` method.

```typescript
const isAvailable = await isGooglePayAvailable()

if (isAvailable) {
  // display Google Pay button
}
```

Next, you can open Google Pay module and let the user choose his credit card, so you can use it to make
the payment.

```typescript
const googlePayResult = await openGooglePay()

if (googlePayResult instanceof GooglePayOpenSuccess) {
  // credit card data was received
}
else if (googlePayResult instanceof GooglePayOpenCancelled) {
  // user closed Google Pay
}
else if (googlePayResult instanceof GooglePayOpenNotConfigured) {
  // Google Pay utils not configured
}
else if (googlePayResult instanceof GooglePayOpenUnknownError) {
  // unknown error has occurred
}
```

> [!important]
> If `googlePayResult` returns `GooglePayOpenSuccess`, you **HAVE TO** use it's content to make an actual
> payment buy using `GooglePayPayment` and `screenlessGooglePayPayment`.

### Screenless Apple Pay payment

Tpay SDK allows you to perform Apple Pay transactions.

> [!warning]
> To be able to complete Apple Pay payment, you will need `apple_pay_token`. You **HAVE TO**
> acquire a token by yourself. To do that check
> official [Apple Pay documentation](https://developer.apple.com/design/human-interface-guidelines/apple-pay#app-top)

```typescript
const applePayPayment = new ApplePayPayment(
  'apple_pay_token',
  new PaymentDetails(
    71.15,
    'transaction description',
    'hidden description',
    Language.pl,
  ),
  new Payer(
    'John Doe',
    'john.doe@example.com',
    '123456789',
    new Address(
      'Test Street1',
      'Warsaw',
      'PL',
      '00-007',
    ),
  ),
  new Callbacks(
    new Redirects('https://success.url', 'https://error.url'),
    new Notifications(
      'https://yourdomain.com/notifications',
      'email@address',
    ),
  ),
);

const screenlessResult = await screenlessApplePayPayment(applePayPayment);

handleScreenlessResult(screenlessResult);
```

## License

This library is released under the [MIT License](https://opensource.org/license/mit/).
