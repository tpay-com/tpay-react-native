/**
 * Step 2 of the two-step Apple Pay flow. Pass the `transactionId` returned
 * from `initApplePayPayment` together with the payment token returned from
 * the Apple Pay wallet authorization to finalize the transaction.
 */
export class ApplePayFinalizePayment {
  transactionId: string;
  applePayToken: string;

  /**
   * @param transactionId - identifier of the transaction created by `initApplePayPayment`
   * @param applePayToken - token received from Apple Pay wallet authorization
   */
  constructor(transactionId: string, applePayToken: string) {
    this.transactionId = transactionId;
    this.applePayToken = applePayToken;
  }
}
