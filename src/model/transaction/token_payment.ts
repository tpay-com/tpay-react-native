import type { Payer } from "../payer/payer";
import type { Notifications } from "../screenless/notifications";
import { Transaction } from "./transaction";

/**
 * Class responsible for storing information about credit card token payment with Tpay UI module.
 */
export class TokenPayment extends Transaction {
  cardToken: string;
  payer: Payer;

  /**
   * @param cardToken - token of tokenized card
   * @param payer - payer information
   * @param amount - amount of money payer has to pay
   * @param description - description of payment shown to payer
   * @param hiddenDescription - description of payment shown to merchant
   * @param notifications - payment notification url and email
   */
  constructor(
    cardToken: string,
    payer: Payer,
    amount: number,
    description: string,
    hiddenDescription: string | null,
    notifications: Notifications | null
  ) {
    super(amount, description, hiddenDescription, notifications);
    this.cardToken = cardToken;
    this.payer = payer;
  }
}
