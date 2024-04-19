import type { BlikAlias } from "../payment_method/blik_alias";
import type { AmbiguousAlias } from "./ambiguous_alias";

/**
 * Class responsible for storing information about ambiguous BLIK payment
 */
export class AmbiguousBlikPayment {
  transactionId: string;
  blikAlias: BlikAlias;
  ambiguousAlias: AmbiguousAlias;

  /**
   * @param transactionId - id of transaction received from ScreenlessBlikAmbiguousAlias result
   * @param blikAlias - BLIK alias used to create transaction with BlikPayment
   * @param ambiguousBlik - ambiguous alias selected by user
   */
  constructor(
    transactionId: string,
    blikAlias: BlikAlias,
    ambiguousBlik: AmbiguousAlias
  ) {
    this.transactionId = transactionId;
    this.blikAlias = blikAlias;
    this.ambiguousAlias = ambiguousBlik;
  }
}
