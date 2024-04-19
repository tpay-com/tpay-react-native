import type { Address } from "./address";

/**
 * Class responsible for storing information about payer
 */
export class Payer {
  name: string;
  email: string;
  phone: string | null;
  address: Address | null;

  /**
   * @param name - payer's full name
   * @param email - payer's email
   * @param phone - payer's phone number
   * @param address - payer's address
   */
  constructor(
    name: string,
    email: string,
    phone: string | null,
    address: Address | null
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
