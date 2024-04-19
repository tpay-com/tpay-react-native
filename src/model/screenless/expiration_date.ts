/**
 * Class responsible for storing information about expiration date
 */
export class ExpirationDate {
  month: String;
  year: String;

  /**
   * @param month - 2-digit month, for example '02'
   * @param year - 2-digit year, for example '24'
   */
  constructor(month: string, year: string) {
    this.month = month;
    this.year = year;
  }
}
