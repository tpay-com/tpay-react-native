import type { LocalizedString } from "../language/localized_string";

/**
 * Class responsible for storing localized information about merchant
 */
export class MerchantDetails {
  merchantDisplayName: Array<LocalizedString>;
  merchantHeadquarters: Array<LocalizedString>;
  regulations: Array<LocalizedString>;

  /**
   * @param merchantDisplayNames - localized display names
   * @param merchantHeadquarters - localized headquarters
   * @param regulationUrls - localized regulation urls
   */
  constructor(
    merchantDisplayNames: Array<LocalizedString>,
    merchantHeadquarters: Array<LocalizedString>,
    regulationUrls: Array<LocalizedString>
  ) {
    this.merchantDisplayName = merchantDisplayNames;
    this.merchantHeadquarters = merchantHeadquarters;
    this.regulations = regulationUrls;
  }
}
