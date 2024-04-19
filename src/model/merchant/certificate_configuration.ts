/**
 * Class responsible for storing information about certificate pinning.
 */
export class CertificatePinningConfiguration {
  pinnedDomain: string;
  publicKeyHash: string;

  /**
   * @param publicKeyHash - public key used to encrypt credit card data during payment/tokenization.
   */
  constructor(publicKeyHash: string) {
    this.publicKeyHash = publicKeyHash;
    this.pinnedDomain = 'api.tpay.com';
  }
}
