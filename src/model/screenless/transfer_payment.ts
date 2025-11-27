import type { Payer } from "../payer/payer";
import type { Callbacks } from "./callbacks";
import type { PaymentDetails } from "./payment_details";
import { ScreenlessPayment } from "./screenless_payment";

/**
 * Class responsible for storing information about transfer payment
 */
export class TransferPayment extends ScreenlessPayment {
  channelId: number;
  bankName: string;

  /**
   * @param channelId - channel id of a bank in Tpay system
   */
  constructor(
    channelId: number,
    bankName: string,
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks
  ) {
    super(paymentDetails, payer, callbacks);
    this.channelId = channelId;
    this.bankName = bankName;
  }
}
