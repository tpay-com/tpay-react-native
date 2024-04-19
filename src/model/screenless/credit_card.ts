import type { CreditCardConfig } from "./credit_card_config";
import type { ExpirationDate } from "./expiration_date";

/**
 * Class responsible for storing information about a credit card
 */
export class CreditCard {
  cardNumber: string;
  expiryDate: ExpirationDate;
  cvv: string;
  config: CreditCardConfig;

  /**
   * @param cardNumber - credit card number
   * @param expiryDate - credit card expiration date
   * @param cvv - cvv code
   * @param config - other credit card information
   */
  constructor(
    cardNumber: string,
    expiryDate: ExpirationDate,
    cvv: string,
    config: CreditCardConfig
  ) {
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
    this.config = config;
  }
}
