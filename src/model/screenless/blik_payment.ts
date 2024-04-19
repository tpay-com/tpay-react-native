import type { Payer } from '../payer/payer';
import type { BlikAlias } from '../payment_method/blik_alias';
import type { Callbacks } from './callbacks';
import type { PaymentDetails } from './payment_details';
import { ScreenlessPayment } from './screenless_payment';

/**
 * Class responsible for storing BLIK payment information
 */
export class BlikPayment extends ScreenlessPayment {
  code: string | null;
  alias: BlikAlias | null;

  /**
   * You have to provide either code or alias.
   * If you provide both, module will try to register the alias.
   * 
   * @param code - 6-digit code
   * @param alias - BLIK alias to register/pay with
   */
  constructor(
    code: string | null,
    alias: BlikAlias | null,
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks | null
  ) {
    super(paymentDetails, payer, callbacks);
    this.code = code;
    this.alias = alias;
  }
}
