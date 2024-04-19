import type { Payer } from "../payer/payer";

/**
 * Class responsible for storing information needed to start UI tokenization.
 */
export class Tokenization {
  payer: Payer;
  notificationUrl: string;

  /**
   * @param payer - information about payer 
   * @param notificationUrl - url for tokenization notifications
   */
  constructor(payer: Payer, notificationUrl: string) {
    this.payer = payer;
    this.notificationUrl = notificationUrl;
  }
}
