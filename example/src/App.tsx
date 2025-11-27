import { SafeAreaView, Text, View } from 'react-native';
import {
  AmbiguousAlias,
  AmbiguousBlikPayment,
  AmountPaymentConstraint,
  ApplePayConfiguration,
  ApplePayPayment,
  AutomaticPaymentMethods,
  BlikAlias,
  BlikPayment,
  Callbacks,
  CertificatePinningConfiguration,
  ConfigurationSuccess,
  configure,
  configureGooglePayUtils,
  CreditCard,
  CreditCardBrand,
  CreditCardConfig,
  CreditCardPayment,
  DigitalWallet,
  ExpirationDate,
  GooglePayConfiguration,
  GooglePayConfigureError,
  GooglePayConfigureSuccess,
  GooglePayEnvironment,
  GooglePayOpenCancelled,
  GooglePayOpenNotConfigured,
  GooglePayOpenSuccess,
  GooglePayOpenUnknownError,
  GooglePayPayment,
  GooglePayUtilsConfiguration,
  InstallmentPayment,
  isGooglePayAvailable,
  Language,
  Languages,
  LocalizedString,
  Merchant,
  MerchantAuthorization,
  MerchantDetails,
  MethodCallError,
  ModuleClosed,
  Notifications,
  openGooglePay,
  Payer,
  PayerContext,
  PaymentCancelled,
  PaymentChannelsError,
  PaymentChannelsSuccess,
  PaymentCompleted,
  PaymentConstraintType,
  PaymentDetails,
  PaymentMethod,
  PaymentMethods,
  RatyPekaoPayment,
  PayPoPayment,
  Redirects,
  Result,
  screenlessAmbiguousBLIKPayment,
  screenlessApplePayPayment,
  ScreenlessBlikAmbiguousAlias,
  screenlessBLIKPayment,
  ScreenlessConfiguredPaymentFailed,
  screenlessCreditCardPayment,
  screenlessGooglePayPayment,
  screenlessPayPoPayment,
  ScreenlessMethodCallError,
  ScreenlessPaid,
  ScreenlessPaymentCreated,
  ScreenlessPaymentError,
  screenlessRatyPekaoPayment,
  ScreenlessResult,
  screenlessTransferPayment,
  ScreenlessValidationError,
  SingleTransaction,
  startCardTokenPayment,
  startPayment,
  Tokenization,
  TokenizationCompleted,
  TokenizationFailure,
  tokenizeCard,
  TokenizedCard,
  TokenPayment,
  TpayConfiguration,
  TpayEnvironment,
  TpayButton,
  TransferPayment,
  ValidationError,
  WalletConfiguration,
  getAvailablePaymentChannels,
  PaymentCreated,
} from 'react-native-tpay';

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

async function startScreenlessTransferPayment() {
  // Provide channelId of a bank
  const transferPayment = new TransferPayment(
    3,
    "bank name",
    paymentDetails,
    payer,
    callbacks,
  );

  const screenlessResult = await screenlessTransferPayment(transferPayment);
  handleScreenlessResult(screenlessResult);
}

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

async function startScreenlessPayPoPayment() {
  const payPoPayment = new PayPoPayment(paymentDetails, payer, callbacks);
  const screenlessResult = await screenlessPayPoPayment(payPoPayment);
  handleScreenlessResult(screenlessResult);
}

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

async function fetchPaymentChannels() {
  const result = await getAvailablePaymentChannels();
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
    [InstallmentPayment.ratyPekao, InstallmentPayment.payPo]
  );

  const configuration = new TpayConfiguration(
    merchant,
    merchantDetails,
    languages,
    paymentMethods
  );

  const result = await configure(configuration);
  if (result instanceof ConfigurationSuccess) {
    // module is ready
  }
  if (result instanceof ValidationError) {
    // data is invalid
    // check error message via result.message
  }
  if (result instanceof MethodCallError) {
    // method call failed
    // check error message via result.message
  }
}

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
    'hidden description',
    notifications
  );

  const result = await startPayment(transaction);
  handleResult(result);
}

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
    'hidden description',
    notifications
  );

  const result = await startCardTokenPayment(tokenPayment);
  handleResult(result);
}

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
    // payment created successfully
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

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Text>react-native-tpay</Text>
        <View style={{ marginHorizontal: 8, marginTop: 16 }}>
          <TpayButton
            onClick={() => console.log('clicked!')}
            isEnabled={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
