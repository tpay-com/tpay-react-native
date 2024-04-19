/**
 * Class responsible for storing information about BLIK alias
 */
export class BlikAlias {
  isRegistered: boolean;
  value: string;
  label: string;

  /**
   * @param isRegistered - true if this BLIK alias is registered (payer saved it after paying with 6-digit code)
   * @param value - payer's unique alias value
   * @param label - alias display name
   */
  constructor(isRegistered: boolean, value: string, label: string) {
    this.isRegistered = isRegistered;
    this.value = value;
    this.label = label;
  }
}
