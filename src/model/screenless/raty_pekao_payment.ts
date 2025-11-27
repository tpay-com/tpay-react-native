import type { Payer } from "../payer/payer";
import type { Callbacks } from "./callbacks";
import type { PaymentDetails } from "./payment_details";
import { ScreenlessPayment } from "./screenless_payment";

/**
 * Class responsible for storing information about Raty Pekao payment
 */
export class RatyPekaoPayment extends ScreenlessPayment {
  channelId: number;

  /**
   * @param channelId - id of Raty Pekao payment channel
   */
  constructor(
    channelId: number,
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks
  ) {
    super(paymentDetails, payer, callbacks);
    this.channelId = channelId;
  }
}
