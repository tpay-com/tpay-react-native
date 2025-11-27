import type { Payer } from "../payer/payer";
import type { Callbacks } from "./callbacks";
import type { PaymentDetails } from "./payment_details";
import { ScreenlessPayment } from "./screenless_payment";

/**
 * Class responsible for storing information about Apple Pay payment
 */
export class ApplePayPayment extends ScreenlessPayment {
  applePayToken: string;

  /**
   * @param applePayToken - Token received from Apple Pay
   */
  constructor(
    applePayToken: string,
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks
  ) {
    super(paymentDetails, payer, callbacks);
    this.applePayToken = applePayToken;
  }
}
