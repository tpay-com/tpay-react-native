import type { Payer } from "../payer/payer";
import type { Callbacks } from "./callbacks";
import type { PaymentDetails } from "./payment_details";
import { ScreenlessPayment } from "./screenless_payment";

/**
 * Step 1 of the two-step Apple Pay flow. Use with `initApplePayPayment` to
 * create a pending Apple Pay transaction and obtain its `transactionId`
 * before presenting the Apple Pay sheet to the user.
 *
 * Pair the resulting `transactionId` with `finalizeApplePayPayment` once the
 * wallet authorization yields a payment token.
 */
export class ApplePayInitPayment extends ScreenlessPayment {
  constructor(
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks
  ) {
    super(paymentDetails, payer, callbacks);
  }
}
