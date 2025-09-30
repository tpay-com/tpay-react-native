import type { Notifications } from "../screenless/notifications";

/**
 * Class responsible for storing information about UI module transaction
 */
export class Transaction {
  amount: number;
  description: string;
  hiddenDescription: string | null;
  notifications: Notifications | null;

  /**
   * @param amount - amount of money payer has to pay
   * @param description - description of payment shown to payer
   * @param hiddenDescription - description of payment shown to merchant
   * @param notifications - payment notification url and email
   */
  constructor(
    amount: number,
    description: string,
    hiddenDescription: string | null,
    notifications: Notifications | null
  ) {
    this.amount = amount;
    this.description = description;
    this.hiddenDescription = hiddenDescription;
    this.notifications = notifications;
  }
}
