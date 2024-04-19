import type { AutomaticPaymentMethods } from "../payment_method/automatic_payment_methods";
import type { Payer } from "./payer";

/**
 * Class responsible for storing information about payer and automatic payment methods
 */
export class PayerContext {
  payer: Payer | null;
  automaticPaymentMethods: AutomaticPaymentMethods | null;

  /**
   * @param payer - payer information
   * @param automaticPaymentMethods - automatic payment methods for payer
   */
  constructor(
    payer: Payer | null,
    automaticPaymentMethods: AutomaticPaymentMethods | null
  ) {
    this.payer = payer;
    this.automaticPaymentMethods = automaticPaymentMethods;
  }
}
