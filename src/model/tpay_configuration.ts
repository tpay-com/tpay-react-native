import type { Languages } from './language/languages';
import type { Merchant } from './merchant/merchant';
import type { MerchantDetails } from './merchant/merchant_details';
import type { PaymentMethods } from './payment_method/payment_methods';

/**
 * Class responsible for storing information about Tpay configuration
 */
export class TpayConfiguration {
  merchant: Merchant;
  merchantDetails: MerchantDetails;
  languages: Languages;
  paymentMethods: PaymentMethods;

  /**
   * @param merchant - configuration information about merchant
   * @param merchantDetails - information about merchant in different languages
   * @param languages - languages that user will be able to use in Tpay UI module
   * @param paymentMethods - payment methods that user will be able to use in Tpay UI module
   */
  constructor(
    merchant: Merchant,
    merchantDetails: MerchantDetails,
    languages: Languages,
    paymentMethods: PaymentMethods
  ) {
    this.merchant = merchant;
    this.merchantDetails = merchantDetails;
    this.languages = languages;
    this.paymentMethods = paymentMethods;
  }
}
