import type { Payer } from "../payer/payer";
import type { Callbacks } from "./callbacks";
import type { PaymentDetails } from "./payment_details";
import { ScreenlessPayment } from "./screenless_payment";

/**
 * Class responsible for storing information about Google Pay payment
 */
export class GooglePayPayment extends ScreenlessPayment {
  token: string;

  /**
   * @param token - token received from Google Pay
   */
  constructor(
    token: string,
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks
  ) {
    super(paymentDetails, payer, callbacks);
    this.token = token;
  }
}
