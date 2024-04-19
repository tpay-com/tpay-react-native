import type { ApplePayConfiguration } from './apple_pay_configuration';
import type { GooglePayConfiguration } from './google_pay_configuration';

/**
 * Class responsible for storing wallet configuration
 */
export class WalletConfiguration {
  googlePay: GooglePayConfiguration | null;
  applePay: ApplePayConfiguration | null;

  /**
   * @param googlePay - Google Pay configuration
   * @param applePay - Apple Pay configuration
   */
  constructor(
    googlePay: GooglePayConfiguration | null,
    applePay: ApplePayConfiguration | null
  ) {
    this.googlePay = googlePay;
    this.applePay = applePay;
  }
}
