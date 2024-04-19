import type { PayerContext } from "../payer/payer_context";
import type { Notifications } from "../screenless/notifications";
import { Transaction } from "./transaction";

/**
 * Class responsible for storing information about standard Tpay UI module payment
 */
export class SingleTransaction extends Transaction {
  payerContext: PayerContext;

  /**
   * @param payerContext - information about payer and automatic payment methods
   * @param amount - amount of money payer has to pay
   * @param description - description of payment shown to payer
   * @param notifications - payment notification url and email
   */
  constructor(
    payerContext: PayerContext,
    amount: number,
    description: string,
    notifications: Notifications | null
  ) {
    super(amount, description, notifications);
    this.payerContext = payerContext;
  }
}
