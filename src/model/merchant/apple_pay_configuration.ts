/**
 * Class responsible for storing information about Apple Pay configuration.
 */
export class ApplePayConfiguration {
  merchantIdentifier: string;
  countryCode: string;

  /**
   * 
   * @param merchantIdentifier - unique id that identifies your business as a merchant able to accept apple payments
   * @param countryCode - country code, for example "PL"
   */
  constructor(merchantIdentifier: string, countryCode: string) {
    this.merchantIdentifier = merchantIdentifier;
    this.countryCode = countryCode;
  }
}
