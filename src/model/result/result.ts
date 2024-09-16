/**
 * Indicates a result of Tpay UI module action
 */
export class Result {}

/**
 * Indicates that credit card tokenization was successful and module was closed
 */
export class TokenizationCompleted extends Result {}

/**
 * Indicates that credit card tokenization failed and module was closed
 */
export class TokenizationFailure extends Result {}

/**
 * Indicates that configuration was successful
 */
export class ConfigurationSuccess extends Result {}

/**
 * Indicates that user closed the module without making a payment/tokenization
 */
export class ModuleClosed extends Result {}

/**
 * Indicates that some data passed to module is invalid
 */
export class ValidationError extends Result {
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
  /**
   * Error message
   */
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
