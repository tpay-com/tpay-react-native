/**
 * Class responsible for storing information about GooglePay configuration
 */
export class GooglePayConfiguration {
  merchantId: string;

  /**
   * @param merchantId - your merchant id in Tpay system
   */
  constructor(merchantId: string) {
    this.merchantId = merchantId;
  }
}
