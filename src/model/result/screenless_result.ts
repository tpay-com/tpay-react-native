import { AmbiguousAlias } from 'react-native-tpay';

/**
 * Indicates a result of screenless action
 */
export class ScreenlessResult {}

/**
 * Indicates that some data passed to payment is invalid
 */
export class ScreenlessValidationError extends ScreenlessResult {
  /**
   * Validation error message
   */
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

/**
 * Indicates a module error
 */
export class ScreenlessMethodCallError extends ScreenlessResult {
  /**
   * Error message
   */
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

/**
 * Indicates that payment was completed successfully
 */
export class ScreenlessPaid extends ScreenlessResult {
  /**
   * Transaction id of the completed transaction
   */
  transactionId: string;

  constructor(transactionId: string) {
    super();
    this.transactionId = transactionId;
  }
}

/**
 * Indicates that payment was created.
 * If it was a credit card or transfer payment you might
 * have to display paymentUrl to the user to finish the payment.
 * If it was a BLIK payment user has to accept it in bank app.
 * It is advised to use long polling mechanism to observe
 * payment status via transactionId.
 */
export class ScreenlessPaymentCreated extends ScreenlessResult {
  /**
   * Transaction id of the created transaction
   */
  transactionId: string;

  /**
   * Payment url, needs to be displayed to the user to finish the payment
   */
  paymentUrl: string | null;

  constructor(transactionId: string, paymentUrl: string | null) {
    super();
    this.transactionId = transactionId;
    this.paymentUrl = paymentUrl;
  }
}

/**
 * Indicates that creating payment failed because of error with:
 * - credit card data or credit card token
 * - BLIK code or BLIK alias
 */
export class ScreenlessConfiguredPaymentFailed extends ScreenlessResult {
  /**
   * Transaction id of the created transaction
   */
  transactionId: string;

  /**
   * Optional error message
   */
  error: string | null;

  constructor(transactionId: string, error: string | null) {
    super();
    this.transactionId = transactionId;
    this.error = error;
  }
}

/**
 * Indicates that payer has the same BLIK alias registered in more than one bank app.
 * You need to display a list of aliases to user and then use AmbiguousBlikPayment to
 * continue the payment.
 */
export class ScreenlessBlikAmbiguousAlias extends ScreenlessResult {
  /**
   * Transaction id of the created transaction
   */
  transactionId: string;

  /**
   * Ambiguous aliases that need to be displayed to the user
   */
  aliases: Array<AmbiguousAlias>;

  constructor(transactionId: string, aliases: Array<AmbiguousAlias>) {
    super();
    this.transactionId = transactionId;
    this.aliases = aliases;
  }
}

/**
 * Indicates that payment was not created because of an error
 */
export class ScreenlessPaymentError extends ScreenlessResult {
  /**
   * Optional error message
   */
  error: string | null;

  constructor(error: string | null) {
    super();
    this.error = error;
  }
}
