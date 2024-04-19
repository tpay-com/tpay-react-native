import type { Language } from "../language/language";

/**
 * Class responsible for storing information about payment details
 */
export class PaymentDetails {
  amount: number;
  description: string;
  hiddenDescription: string | null;
  language: Language | null;

  /**
   * @param amount - amount of money payer has to pay
   * @param description - description of payment shown to payer
   * @param hiddenDescription - description visible to store
   * @param language - language of the transaction
   */
  constructor(
    amount: number,
    description: string,
    hiddenDescription: string | null,
    language: Language | null
  ) {
    this.amount = amount;
    this.description = description;
    this.hiddenDescription = hiddenDescription;
    this.language = language;
  }
}
