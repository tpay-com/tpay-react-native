/**
 * Indicates a result of Tpay UI module action
 */
export abstract class Result {
  /**
   * Type identifier for the result
   */
  abstract readonly type: string;

  /**
   * Optional error message or additional information
   */
  message?: string;

  /**
   * Transaction ID when applicable
   */
  transactionId?: string | null;

  /**
   * Payment URL for continuation (used in screenless payments)
   */
  paymentUrl?: string;
}

/**
 * Indicates that credit card tokenization was successful and module was closed
 */
export class TokenizationCompleted extends Result {
  readonly type = 'tokenizationCompleted';
}

/**
 * Indicates that credit card tokenization failed and module was closed
 */
export class TokenizationFailure extends Result {
  readonly type = 'tokenizationFailure';
}

/**
 * Indicates that configuration was successful
 */
export class ConfigurationSuccess extends Result {
  readonly type = 'configurationSuccess';
}

/**
 * Indicates that user closed the module without making a payment/tokenization
 */
export class ModuleClosed extends Result {
  readonly type = 'moduleClosed';
}

/**
 * Indicates that some data passed to module is invalid
 */
export class ValidationError extends Result {
  readonly type = 'validationError';
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
 * Indicates that payment was successfully created
 */
export class PaymentCreated extends Result {
  readonly type = 'paymentCreated';
  /**
   * Transaction id of the created transaction
   */
  transactionId: string;

  constructor(transactionId: string) {
    super();
    this.transactionId = transactionId;
  }
}

/**
 * Indicates that payment was successful and module was closed
 */
export class PaymentCompleted extends Result {
  readonly type = 'paymentCompleted';
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
 * Indicates that payment failed and module was closed
 */
export class PaymentCancelled extends Result {
  readonly type = 'paymentCancelled';
  /**
   * If exists, id of the transaction
   */
  transactionId: string | null;

  constructor(transactionId: string | null) {
    super();
    this.transactionId = transactionId;
  }
}

/**
 * Indicates a module error
 */
export class MethodCallError extends Result {
  readonly type = 'methodCallError';
  /**
   * Error message
   */
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
