import type { DigitalWallet } from './digital_wallet';
import type { InstallmentPayment } from './installment_payment';
import type { PaymentMethod } from './payment_method';

/**
 * Class responsible for storing selected payment methods
 */
export class PaymentMethods {
  methods: Array<PaymentMethod>;
  wallets: Array<DigitalWallet> | null;
  installmentPayments: Array<InstallmentPayment> | null;

  /**
   * @param methods - selected payment methods
   * @param wallets - selected digital wallets
   * @param installmentPayments - selected installment payments
   */
  constructor(
    methods: Array<PaymentMethod>,
    wallets: Array<DigitalWallet> | null,
    installmentPayments: Array<InstallmentPayment> | null
  ) {
    this.methods = methods;
    this.wallets = wallets;
    this.installmentPayments = installmentPayments;
  }
}