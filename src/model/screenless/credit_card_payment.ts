import type { Payer } from "../payer/payer";
import type { Callbacks } from "./callbacks";
import type { CreditCard } from "./credit_card";
import type { PaymentDetails } from "./payment_details";
import { ScreenlessPayment } from "./screenless_payment";

/**
 * Class responsible for storing information about credit card payment
 */
export class CreditCardPayment extends ScreenlessPayment {
  creditCard: CreditCard | null;
  creditCardToken: string | null;

  /**
   * You have to provide either creditCard or creditCardToken.
   * If you provide both, creditCardToken will be used.
   * 
   * @param creditCard - information about credit card
   * @param creditCardToken - token of tokenized card (for returning customers)
   */
  constructor(
    creditCard: CreditCard | null,
    creditCardToken: string | null,
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks | null
  ) {
    super(paymentDetails, payer, callbacks);
    this.creditCard = creditCard;
    this.creditCardToken = creditCardToken;
  }
}
