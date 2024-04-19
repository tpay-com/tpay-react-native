/**
 * Class responsible for storing merchant's authorization
 */
export class MerchantAuthorization {
  clientId: string;
  clientSecret: string;

  /**
   * @param clientId - your client id in Tpay system
   * @param clientSecret - your client secret in Tpay system
   */
  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
}
