# react-native-tpay

The Tpay SDK empowers your app to seamlessly integrate Tpay’s payment functionalities, providing a comprehensive and developer-friendly solution for managing payments.
Documentation is available [here](https://tpay-com.github.io/tpay-react-native/).
## Installation

```sh
npm install react-native-tpay
```

## UI Module

Tpay package contains a UI module. Users can interact with it to make payments.

## Setup

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

### iOS

When integrating the Tpay payment module into your app, it’s important to ensure that the necessary permissions are correctly set up to ensure a smooth user experience.

#### Privacy - Camera Usage Description

The module allows the user to automatically fill the credit card form for secure payment processing. This feature requires you to setup the “Privacy - Camera Usage Description” in your app’s Info.plist file.

Integration Steps
1. Open your project’s Info.plist file.
2. Add the key-value pair for the “Privacy - Camera Usage Description” permission, explaining the purpose of camera access. Clearly state that the camera is used to facilitate the automatic filling of the credit card form for secure payment processing.

Example:
```
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to automatically fill the credit card form for secure payment processing.</string>
```

## Handling UI module events

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

## Configure Tpay package

```typescript
async function configureTpay() {
  const authorization = new MerchantAuthorization('client id', 'client secret');
  const certificateConfiguration = new CertificatePinningConfiguration(
    'public key hash'
  );

  const merchant = new Merchant(
    authorization,
    TpayEnvironment.production,
    certificateConfiguration,
    'BLIK alias to register',
    new WalletConfiguration(
      new GooglePayConfiguration('merchant id'),
      new ApplePayConfiguration('merchant identifier', 'country code')
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
      new LocalizedString(Language.pl, 'polish url'),
      new LocalizedString(Language.en, 'english url'),
    ]
  );

  const languages = new Languages(Language.pl, [Language.en, Language.pl]);
  const paymentMethods = new PaymentMethods(
    [PaymentMethod.card, PaymentMethod.blik, PaymentMethod.transfer],
    [DigitalWallet.googlePay, DigitalWallet.applePay],
    [InstallmentPayment.ratyPekao]
  );

  const configuration = new TpayConfiguration(
    merchant,
    merchantDetails,
    languages,
    paymentMethods
  );

  const result = await configure(configuration);
  handleResult(result);
}
```

## Payment with UI module

```typescript
async function startUiPayment() {
  // Create a payer object, phone number and address fields are optional
  // Name and email fields can be empty, user will fill them in the UI
  const payer = new Payer('John Doe', 'john.doe@example.com', null, null);

  // Users can choose to save a credit card, it will result in your backend
  // receiving the tokenized card data, provide it there to enable one click payment.
  // You can also provide the BLIK alias to enable the one click BLIK payments.
  // To register the BLIK alias user has to make a payment with 6-digit code first and save the alias.
  // BLIK one click will be shown in the UI when the provided 'isRegistered' parameter is true.
  const automaticPaymentMethods = new AutomaticPaymentMethods(
    [new TokenizedCard('card token', 'card tail', CreditCardBrand.mastercard)],
    new BlikAlias(true, 'alias value', 'alias label')
  );

  // Tokenized card and BLIK alias registration data will be sent to the notification url.
  // Payments will result in a email notifications sent to notification email.
  const notifications = new Notifications(
    'https://yourdomain.com/notifications',
    'store@yourdomain.com'
  );

  const payerContext = new PayerContext(payer, automaticPaymentMethods);

  const transaction = new SingleTransaction(
    payerContext,
    39.99,
    'transaction description',
    'description of payment shown to merchant',
    notifications
  );

  const result = await startPayment(transaction);
  handleResult(result);
}
```

## Credit card tokenization with UI module

```typescript
async function startCreditCardTokenizationUi() {
  // Create a payer object, phone number and address fields are optional
  // Name and email fields can be empty, user will fill them in the UI
  const payer = new Payer('John Doe', 'john.doe@example.com', null, null);

  // Tokenized card data will be sent to notification url
  const tokenization = new Tokenization(
    payer,
    'https://yourdomain.com/notifications'
  );

  const result = await tokenizeCard(tokenization);
  handleResult(result);
}
```

## Credit card token payment with UI module

```typescript
async function startCreditCardTokenPaymentUi() {
  // Create a payer object, phone number and address fields are optional
  // Name and email fields are required, because user cannot fill them in the UI
  const payer = new Payer('John Doe', 'john.doe@example.com', null, null);

  const notifications = new Notifications(
    'https://yourdomain.com/notifications',
    'store@yourdomain.com'
  );

  const tokenPayment = new TokenPayment(
    'credit card token',
    payer,
    39.99,
    'transaction description',
    'description of payment shown to merchant',
    notifications
  );

  const result = await startCardTokenPayment(tokenPayment);
  handleResult(result);
}
```

## Screenless Payments

Tpay package provides methods to create payments without displaying the UI module.

## Handling screenless events

```typescript
function handleScreenlessResult(result: ScreenlessResult) {
  if (result instanceof ScreenlessPaid) {
    // payment completed successfully
    // read transactionId via result.transactionId
  }
  if (result instanceof ScreenlessPaymentCreated) {
    // payment was successfully created
    // if it was a BLIK payment user has to accept it in bank app
    // if it was a credit card, transfer or installment payment you have to
    // display result.paymentUrl to finish the payment
    // it is advised to use long polling mechanism to observe payment status
    // you can get transaction id from result.transactionId
  }
  if (result instanceof ScreenlessPaymentError) {
    // creating payment failed
    // read error message via result.error
  }
  if (result instanceof ScreenlessConfiguredPaymentFailed) {
    // creating payment failed because of error with:
    // - credit card data or credit card token
    // - BLIK code or BLIK alias
  }
  if (result instanceof ScreenlessBlikAmbiguousAlias) {
    // when using BLIK payment with alias this result indicates
    // that user has alias registered in more than one bank
    // display result.aliases to the user and
    // continue payment using screenlessAmbiguousBLIKPayment(...) method
  }
  if (result instanceof ScreenlessValidationError) {
    // provided data is invalid
    // check error message via result.message
  }
  if (result instanceof ScreenlessMethodCallError) {
    // package error occurred
    // read error message via result.message
  }
}
```

## Common screenless objects

Screenless payments require the following objects.

```typescript
// Create a payer object, phone number and address fields are optional
// Name and email fields are required in screenless payments
const payer = new Payer('John Doe', 'john.doe@example.com', null, null);

// Hidden description can be used to search for transaction internally.
// Tpay website (if needed) will open in the provided language.
const paymentDetails = new PaymentDetails(
  39.99,
  'transaction description',
  'hidden description',
  Language.pl
);

// User will be redirected to these urls after a payment on the Tpay website.
// Catch these urls in your web view to know if the payment was successful or not.
const redirects = new Redirects(
  'https://yourdomain.com/success',
  'https://yourdomain.com/error'
);

// Tokenized card and BLIK alias registration data will be sent to the notification url.
// Payments will result in a email notifications sent to notification email.
const notifications = new Notifications(
  'https://yourdomain.com/notifications',
  'store@yourdomain.com'
);

const callbacks = new Callbacks(redirects, notifications);
```

## Screenless BLIK payment

Using BLIK user can pay with 6-digit code or alias (for returning customers).

```typescript
async function startScreenlessBlikPayment() {
  // You have to provide either code or alias.
  // If you provide both, package will try to register the alias.
  // One alias can be registered in multiple banks.
  const blikPayment = new BlikPayment(
    '6-digit code',
    new BlikAlias(true, 'alias value', 'alias label'),
    paymentDetails,
    payer,
    callbacks
  );

  const screenlessResult = await screenlessBLIKPayment(blikPayment);
  handleScreenlessResult(screenlessResult);
}
```

## Screenless ambiguous BLIK payment

screenlessBLIKPayment(...) method can return a ScreenlessBlikAmbiguousAlias result,
this means that user has BLIK alias registered in more than one bank.
You need to display ambiguous aliases provided in ScreenlessBlikAmbiguousAlias result to the user.
After that, you need to continue the payment with ambiguous alias selected by user using screenlessAmbiguousBLIKPayment(...) method.

```typescript
async function startAmbiguousBlikPayment(
  result: ScreenlessBlikAmbiguousAlias,
  ambiguousAlias: AmbiguousAlias
) {
  // BLIK alias used to create payment with screenlessBLIKPayment(...) method
  const blikAlias = new BlikAlias(true, 'alias value', 'alias label');

  // Provide transaction id from result and ambiguous alias selected by user
  const ambiguousBlikPayment = new AmbiguousBlikPayment(
    result.transactionId,
    blikAlias,
    ambiguousAlias
  );

  const screenlessResult = await screenlessAmbiguousBLIKPayment(
    ambiguousBlikPayment
  );
  handleScreenlessResult(screenlessResult);
}
```

## Screenless transfer payment

Transfer payment requires a channelId of bank in Tpay system.

```typescript
async function startScreenlessTransferPayment() {
  // Provide channelId of a bank
  const transferPayment = new TransferPayment(
    3,
    paymentDetails,
    payer,
    callbacks
  );

  const screenlessResult = await screenlessTransferPayment(transferPayment);
  handleScreenlessResult(screenlessResult);
}
```

## Screenless Raty Pekao payment

Raty Pekao payment requires a channelId of Raty Pekao variant.

```typescript
async function startScreenlessRatyPekaoPayment() {
  // Provide channelId of Raty Pekao variant
  const ratyPekaoPayment = new RatyPekaoPayment(
    80,
    paymentDetails,
    payer,
    callbacks
  );

  const screenlessResult = await screenlessRatyPekaoPayment(ratyPekaoPayment);
  handleScreenlessResult(screenlessResult);
}
```

## Screenless PayPo payment
```typescript
async function startScreenlessPayPoPayment() {
  const payPoPayment = new PayPoPayment(paymentDetails, payer, callbacks);
  const screenlessResult = await screenlessPayPoPayment(payPoPayment);
  handleScreenlessResult(screenlessResult);
}
```

## Screenless credit card payment

Credit card payment can be created with credit card data or credit card token (for returning customers).

```typescript
async function startScreenlessCreditCardPayment() {
  const creditCard = new CreditCard(
    'card number',
    new ExpirationDate('month', 'year'),
    'cvv',
    // Configure if the credit card should be tokenized after payment
    // Provide your domain, it's used while encrypting the credit card data
    new CreditCardConfig(false, 'yourdomain.com', null)
  );
  const creditCardToken = 'card token';

  // You have to provide either credit card or credit card token
  const creditCardPayment = new CreditCardPayment(
    creditCard,
    creditCardToken,
    paymentDetails,
    payer,
    callbacks
  );

  const screenlessResult = await screenlessCreditCardPayment(creditCardPayment);
  handleScreenlessResult(screenlessResult);
}
```

## Screenless Google Pay payment (Android only)

Google Pay payment requires a Google Pay token.

```typescript
async function startScreenlessGooglePayPayment() {
  const googlePayPayment = new GooglePayPayment(
    'Google Pay token',
    paymentDetails,
    payer,
    callbacks
  );

  const screenlessResult = await screenlessGooglePayPayment(googlePayPayment);
  handleScreenlessResult(screenlessResult);
}
```

## Screenless Apple Pay payment (iOS only)

Apple Pay payment requires a Apple Pay token.

```typescript
async function startScreenlessApplePayPayment() {
  const applePayPayment = new ApplePayPayment(
    'Apple Pay token',
    paymentDetails,
    payer,
    callbacks
  );

  const screenlessResult = await screenlessApplePayPayment(applePayPayment);
  handleScreenlessResult(screenlessResult);
}
```

## Google Pay utils (Android only)

Tpay package offers few convenience methods to interact with Google Pay.

```typescript
async function googlePayUtils() {
  // Create configuration object by providing the final price,
  // your store name, your merchant id and a Google Pay environment
  const googlePayUtilsConfiguration = new GooglePayUtilsConfiguration(
    39.99,
    'your store name',
    'your merchant id',
    GooglePayEnvironment.production,
    null
  );
  const configurationResult = await configureGooglePayUtils(
    googlePayUtilsConfiguration
  );

  if (configurationResult instanceof GooglePayConfigureError) {
    // configuration failed
    // check error message via configurationResult.message
  }
  if (configurationResult instanceof GooglePayConfigureSuccess) {
    // utils are configured

    const isAvailable = await isGooglePayAvailable();
    if (isAvailable) {
      // show Google Pay button

      // if user clicks on the button do the following
      const googlePayOpenResult = await openGooglePay();

      if (googlePayOpenResult instanceof GooglePayOpenSuccess) {
        // credit card data was received
        // read Google Pay token via googlePayOpenResult.token
        // and use it with GooglePayPayment
      }
      if (googlePayOpenResult instanceof GooglePayOpenCancelled) {
        // user closed Google Pay
      }
      if (googlePayOpenResult instanceof GooglePayOpenNotConfigured) {
        // Google Pay utils not configured
      }
      if (googlePayOpenResult instanceof GooglePayOpenUnknownError) {
        // unknown error has occurred
      }
    }
  }
}
```

## Fetch payment channels

Fetch available payment channels for your merchant account. Filter channels based on availability and payment constraints.

```typescript
async function fetchPaymentChannels() {
  const result = await getPaymentChannels();
  if (result instanceof PaymentChannelsSuccess) {
    // payment channels received

    result.channels.forEach((channel) => {
      // channel can have payment constraints
      // that need to be satisfied, otherwise the payment creation will fail
      channel.constraints.forEach((constraint) => {
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
        }
      });

      // display payment channel if all payment constraints are satisfied
    });
  }
  if (result instanceof PaymentChannelsError) {
    // error occurred
    // read error message via result.message
  }
}
```

## License

This library is released under the [MIT License](https://opensource.org/license/mit/).
