/**
 * Class responsible for storing payment related information about credit card
 */
export class CreditCardConfig {
  shouldSave: boolean;
  domain: string;
  rocText: string | null;

  /**
   * @param shouldSave - whether credit card should be tokenized after payment
   * @param domain - domain of your store
   */
  constructor(shouldSave: boolean, domain: string, rocText: string | null) {
    this.shouldSave = shouldSave;
    this.domain = domain;
    this.rocText = rocText;
  }
}
