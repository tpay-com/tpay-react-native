import type { Payer } from '../payer/payer';
import type { Callbacks } from './callbacks';
import type { PaymentDetails } from './payment_details';
import { ScreenlessPayment } from './screenless_payment';

/**
 * Class responsible for storing information about PayPo payment
 */
export class PayPoPayment extends ScreenlessPayment {
  constructor(
    paymentDetails: PaymentDetails,
    payer: Payer,
    callbacks: Callbacks | null
  ) {
    super(paymentDetails, payer, callbacks);
  }
}
