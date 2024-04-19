import type { BlikAlias } from "./blik_alias";
import type { TokenizedCard } from "./tokenized_card";

/**
 * Class responsible for storing information about payer's automatic payment methods
 */
export class AutomaticPaymentMethods {
  tokenizedCards: Array<TokenizedCard> | null;
  blikAlias: BlikAlias | null;

  /**
   * @param tokenizedCards - tokenized cards created after successful credit card payment
   * @param blikAlias - BLIK alias that will be registered after payment or used to pay (if registered)
   */
  constructor(
    tokenizedCards: Array<TokenizedCard> | null,
    blikAlias: BlikAlias | null
  ) {
    this.tokenizedCards = tokenizedCards;
    this.blikAlias = blikAlias;
  }
}
