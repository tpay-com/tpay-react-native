import type { Frequency } from "./frequency";

/**
 * Class responsible for storing information about recurring payments
 */
export class Recursive {
  frequency: Frequency;
  quantity: number | null;
  endDate: string;

  /**
   * @param frequency - how often payment should be repeated
   * @param quantity - how many times payment should be repeated. If null, quantity = infinity
   * @param endDate - date in yyyy-MM-dd format
   */
  constructor(frequency: Frequency, quantity: number | null, endDate: string) {
    this.frequency = frequency;
    this.quantity = quantity;
    this.endDate = endDate;
  }
}
