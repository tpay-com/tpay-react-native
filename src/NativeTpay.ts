import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Configuration
  configure(configuration: string): Promise<string>;

  // Payment methods
  startPayment(transaction: string): Promise<string>;
  startCardTokenPayment(tokenPayment: string): Promise<string>;
  tokenizeCard(tokenization: string): Promise<string>;

  // Screenless payments
  screenlessBLIKPayment(blikPayment: string): Promise<string>;
  screenlessAmbiguousBLIKPayment(ambiguousBlikPayment: string): Promise<string>;
  screenlessCreditCardPayment(creditCardPayment: string): Promise<string>;
  screenlessTransferPayment(transferPayment: string): Promise<string>;
  screenlessGooglePayPayment(googlePayPayment: string): Promise<string>;
  screenlessApplePayPayment(applePayPayment: string): Promise<string>;
  screenlessRatyPekaoPayment(ratyPekaoPayment: string): Promise<string>;
  screenlessPayPoPayment(payPoPayment: string): Promise<string>;

  // Google Pay utilities
  configureGooglePayUtils(configuration: string): Promise<string>;
  isGooglePayAvailable(): Promise<boolean>;
  openGooglePay(): Promise<string>;

  // Payment channels
  getAvailablePaymentChannels(): Promise<string>;
}


export default TurboModuleRegistry.get<Spec>('TpayRNModule');
