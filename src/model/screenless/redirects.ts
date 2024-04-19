/**
 * Class responsible for storing information about redirect urls
 */
export class Redirects {
  successUrl: string;
  errorUrl: string;

  /**
   * @param successUrl - payer will be redirected to this url after successful payment
   * @param errorUrl - payer will be redirected to this url after unsuccessful payment
   */
  constructor(successUrl: string, errorUrl: string) {
    this.successUrl = successUrl;
    this.errorUrl = errorUrl;
  }
}
