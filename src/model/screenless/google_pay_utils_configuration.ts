import type { GooglePayEnvironment } from "./google_pay_environment";

/**
 * Class responsible for storing information about Google Pay utils configuration
 */
export class GooglePayUtilsConfiguration {
  price: number;
  merchantName: string;
  merchantId: string;
  environment: GooglePayEnvironment;
  customRequestCode: number | null;

  /**
   * @param price - price that will be displayed in Google Pay
   * @param merchantName - store name displayed in Google Pay
   * @param merchantId - your merchantId in Tpay system
   * @param environment - Google Pay environment
   * @param customRequestCode - alternative request code that will be used to manage Google Pay data
   */
  constructor(
    price: number,
    merchantName: string,
    merchantId: string,
    environment: GooglePayEnvironment,
    customRequestCode: number | null
  ) {
    this.price = price;
    this.merchantName = merchantName;
    this.merchantId = merchantId;
    this.environment = environment;
    this.customRequestCode = customRequestCode;
  }
}
