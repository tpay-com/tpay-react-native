import type { CreditCardBrand } from "./credit_card_brand";

/**
 * Class responsible for storing tokenized card information
 */
export class TokenizedCard {
  token: string;
  cardTail: string;
  brand: CreditCardBrand;

  /**
   * @param token - credit card token
   * @param cardTail - 4 last numbers of credit card number
   * @param brand - credit card brand
   */
  constructor(token: string, cardTail: string, brand: CreditCardBrand) {
    this.token = token;
    this.cardTail = cardTail;
    this.brand = brand;
  }
}
