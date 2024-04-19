import type { Notifications } from "../screenless/notifications";

/**
 * Class responsible for storing information about UI module transaction
 */
export class Transaction {
  amount: number;
  description: string;
  notifications: Notifications | null;

  /**
   * @param amount - amount of money payer has to pay
   * @param description - description of payment shown to payer
   * @param notifications - payment notification url and email
   */
  constructor(
    amount: number,
    description: string,
    notifications: Notifications | null
  ) {
    this.amount = amount;
    this.description = description;
    this.notifications = notifications;
  }
}
