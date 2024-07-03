import { NativeModules, Platform } from 'react-native';
import type { TpayConfiguration } from './model/tpay_configuration';
import { mapResult } from './util/result_util';
import { Result } from './model/result/result';
import type { SingleTransaction } from './model/transaction/single_transaction';
import type { Tokenization } from './model/tokenization/tokenization';
import type { TokenPayment } from './model/transaction/token_payment';
import type { ScreenlessResult } from './model/result/screenless_result';
import { mapScreenlessResult } from './util/screenless_result_util';
import type { AmbiguousBlikPayment } from './model/screenless/ambiguous_blik_payment';
import type { TransferPayment } from './model/screenless/transfer_payment';
import type { CreditCardPayment } from './model/screenless/credit_card_payment';
import type { GooglePayPayment } from './model/screenless/google_pay_payment';
import type { GooglePayUtilsConfiguration } from './model/screenless/google_pay_utils_configuration';
import type { GooglePayConfigureResult } from './model/result/google_pay_configure_result';
import { mapGooglePayConfigurationResult } from './util/google_pay_configuration_util';
import type { GooglePayOpenResult } from './model/result/google_pay_open_result';
import { mapGooglePayOpenResult } from './util/google_pay_open_util';
import type { PaymentChannelsResult } from './model/result/payment_channels_result';
import { mapPaymentChannelsResult } from './util/payment_channels_util';
import type { RatyPekaoPayment } from './model/screenless/raty_pekao_payment';
import type { BlikPayment } from './model/screenless/blik_payment';
import type { ApplePayPayment } from './model/screenless/apple_pay_payment';
import type { PayPoPayment } from './model/screenless/pay_po_payment';

const LINKING_ERROR =
  `The package 'react-native-tpay' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Tpay = NativeModules.TpayRNModule
  ? NativeModules.TpayRNModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export * from './model/language/language';
export * from './model/language/languages';
export * from './model/language/localized_string';
export * from './model/merchant/apple_pay_configuration';
export * from './model/merchant/certificate_configuration';
export * from './model/merchant/google_pay_configuration';
export * from './model/merchant/merchant_authorization';
export * from './model/merchant/merchant_details';
export * from './model/merchant/merchant';
export * from './model/merchant/tpay_environment';
export * from './model/merchant/wallet_configuration';
export * from './model/payer/address';
export * from './model/payer/payer_context';
export * from './model/payer/payer';
export * from './model/payment_channel/payment_channel';
export * from './model/payment_channel/payment_constraint';
export * from './model/payment_channel/payment_group';
export * from './model/payment_method/automatic_payment_methods';
export * from './model/payment_method/blik_alias';
export * from './model/payment_method/credit_card_brand';
export * from './model/payment_method/digital_wallet';
export * from './model/payment_method/installment_payment';
export * from './model/payment_method/payment_method';
export * from './model/payment_method/payment_methods';
export * from './model/payment_method/tokenized_card';
export * from './model/result/google_pay_configure_result';
export * from './model/result/google_pay_open_result';
export * from './model/result/payment_channels_result';
export * from './model/result/result';
export * from './model/result/screenless_result';
export * from './model/screenless/ambiguous_alias';
export * from './model/screenless/ambiguous_blik_payment';
export * from './model/screenless/apple_pay_payment';
export * from './model/screenless/blik_payment';
export * from './model/screenless/callbacks';
export * from './model/screenless/credit_card_config';
export * from './model/screenless/credit_card_payment';
export * from './model/screenless/credit_card';
export * from './model/screenless/expiration_date';
export * from './model/screenless/frequency';
export * from './model/screenless/google_pay_environment';
export * from './model/screenless/google_pay_payment';
export * from './model/screenless/google_pay_utils_configuration';
export * from './model/screenless/notifications';
export * from './model/screenless/payment_details';
export * from './model/screenless/raty_pekao_payment';
export * from './model/screenless/pay_po_payment';
export * from './model/screenless/recursive';
export * from './model/screenless/redirects';
export * from './model/screenless/screenless_payment';
export * from './model/screenless/transfer_payment';
export * from './model/tokenization/tokenization';
export * from './model/transaction/single_transaction';
export * from './model/transaction/token_payment';
export * from './model/transaction/transaction';
export * from './model/tpay_configuration';
export * from './component/tpay_button';

/**
 * Method used to configure Tpay UI Module
 *
 * @returns {Result} ConfigurationSuccess when Tpay module was successfully configured
 */
export async function configure(
  configuration: TpayConfiguration
): Promise<Result> {
  const result = await Tpay.configure(JSON.stringify(configuration));
  return mapResult(result);
}

/**
 * Method used to start standard payment with Tpay UI Module
 */
export async function startPayment(
  transaction: SingleTransaction
): Promise<Result> {
  const result = await Tpay.startPayment(JSON.stringify(transaction));
  return mapResult(result);
}

/**
 * Method used to start credit card tokenization with Tpay UI Module
 */
export async function tokenizeCard(
  tokenization: Tokenization
): Promise<Result> {
  const result = await Tpay.tokenizeCard(JSON.stringify(tokenization));
  return mapResult(result);
}

/**
 * Method used to start credit card token payment with Tpay UI Module
 */
export async function startCardTokenPayment(
  tokenPayment: TokenPayment
): Promise<Result> {
  const result = await Tpay.startCardTokenPayment(JSON.stringify(tokenPayment));
  return mapResult(result);
}

/**
 * Method used to start screenless BLIK payment
 */
export async function screenlessBLIKPayment(
  blikPayment: BlikPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessBLIKPayment(JSON.stringify(blikPayment));
  return mapScreenlessResult(result);
}

/**
 * Method used to continue BLIK one click payment if ambiguous aliases were returned
 */
export async function screenlessAmbiguousBLIKPayment(
  ambiguousBlikPayment: AmbiguousBlikPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessAmbiguousBLIKPayment(
    JSON.stringify(ambiguousBlikPayment)
  );
  return mapScreenlessResult(result);
}

/**
 * Method used to start screenless transfer payment
 */
export async function screenlessTransferPayment(
  transferPayment: TransferPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessTransferPayment(
    JSON.stringify(transferPayment)
  );
  return mapScreenlessResult(result);
}

/**
 * Method used to start screenless Raty Pekao payment
 */
export async function screenlessRatyPekaoPayment(
  ratyPekaoPayment: RatyPekaoPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessRatyPekaoPayment(
    JSON.stringify(ratyPekaoPayment)
  );
  return mapScreenlessResult(result);
}

/**
 * Method used to start screenless PayPo payment
 */
export async function screenlessPayPoPayment(
  payPoPayment: PayPoPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessPayPoPayment(
    JSON.stringify(payPoPayment)
  );
  return mapScreenlessResult(result);
}

/**
 * Method used to start screenless credit card payment
 */
export async function screenlessCreditCardPayment(
  creditCardPayment: CreditCardPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessCreditCardPayment(
    JSON.stringify(creditCardPayment)
  );
  return mapScreenlessResult(result);
}

/**
 * Method used to start screenless Google Pay payment
 */
export async function screenlessGooglePayPayment(
  googlePayPayment: GooglePayPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessGooglePayPayment(
    JSON.stringify(googlePayPayment)
  );
  return mapScreenlessResult(result);
}

/**
 * Method used to start screenless Apple Pay payment
 */
export async function screenlessApplePayPayment(
  applePayPayment: ApplePayPayment
): Promise<ScreenlessResult> {
  const result = await Tpay.screenlessApplePayPayment(
    JSON.stringify(applePayPayment)
  );
  return mapScreenlessResult(result);
}

/**
 * Method used to configure Google Pay utils.
 * Call this method before using isGooglePayAvailable and openGooglePay methods.
 *
 * Android only
 */
export async function configureGooglePayUtils(
  googlePayUtilsConfiguration: GooglePayUtilsConfiguration
): Promise<GooglePayConfigureResult> {
  const result = await Tpay.configureGooglePayUtils(
    JSON.stringify(googlePayUtilsConfiguration)
  );
  return mapGooglePayConfigurationResult(result);
}

/**
 * Method used to check if Google Pay is available
 *
 * Android only
 *
 * @returns true if Google Pay is available on the device
 */
export async function isGooglePayAvailable(): Promise<Boolean> {
  return await Tpay.isGooglePayAvailable();
}

/**
 * Method used to open Google Pay
 *
 * Android only
 *
 * @returns GooglePayOpenSuccess object if user successfully selects the credit card
 */
export async function openGooglePay(): Promise<GooglePayOpenResult> {
  const result = await Tpay.openGooglePay();
  return mapGooglePayOpenResult(result);
}

/**
 * Method used to fetch payment channels from Tpay
 */
export async function getAvailablePaymentChannels(): Promise<PaymentChannelsResult> {
  const result = await Tpay.getAvailablePaymentChannels();
  return mapPaymentChannelsResult(result);
}
