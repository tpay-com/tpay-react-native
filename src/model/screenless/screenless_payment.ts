import type { Payer } from "../payer/payer";
import type { Callbacks } from "./callbacks";
import type { PaymentDetails } from "./payment_details";

/**
 * Class responsible for storing information about screenless payment details
 */
export class ScreenlessPayment {
  paymentDetails: PaymentDetails;
  payer: Payer;
  callbacks: Callbacks;

  /**
   * @param paymentDetails - information about price and description
   * @param payer - information about payer
   * @param callbacks - redirects and notification information
   */
  constructor(
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks
  ) {
    this.paymentDetails = paymentDetails;
    this.payer = payer;
    this.callbacks = callbacks;
  }
}
