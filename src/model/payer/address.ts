/**
 * Class responsible for storing payer address
 */
export class Address {
  address: string | null;
  city: string | null;
  countryCode: string | null;
  postalCode: string | null;

  /**
   * @param address - street number
   * @param city - city name
   * @param countryCode - country code, for example 'PL'
   * @param postalCode - postal code
   */
  constructor(
    address: string | null,
    city: string | null,
    countryCode: string | null,
    postalCode: string | null
  ) {
    this.address = address;
    this.city = city;
    this.countryCode = countryCode;
    this.postalCode = postalCode;
  }
}
