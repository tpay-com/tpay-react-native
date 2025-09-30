/**
 * Indicates a result of Google Pay open
 */
export abstract class GooglePayOpenResult {
  /**
   * Type identifier for the result
   */
  abstract readonly type: string;

  /**
   * Google Pay card token when available
   */
  token?: string;

  /**
   * Credit card description when available
   */
  description?: string;

  /**
   * Credit card network when available
   */
  cardNetwork?: string;

  /**
   * Last digits of credit card number when available
   */
  cardTail?: string;
}

/**
 * Indicates that Google Pay was successfully opened and user has selected a credit card
 */
export class GooglePayOpenSuccess extends GooglePayOpenResult {
  readonly type = 'success';
  /**
   * Google Pay card token, use it with GooglePayPayment
   */
  token: string;

  /**
   * Credit card description, for example "Visa •••• 1111"
   */
  description: string;

  /**
   * Credit card network
   */
  cardNetwork: string;

  /**
   * Last digits of credit card number
   */
  cardTail: string;

  constructor(
    token: string,
    description: string,
    cardNetwork: string,
    cardTail: string
  ) {
    super();
    this.token = token;
    this.description = description;
    this.cardNetwork = cardNetwork;
    this.cardTail = cardTail;
  }
}

/**
 * Indicates that Google Pay was opened successfully but user closed it without selecting a credit card
 */
export class GooglePayOpenCancelled extends GooglePayOpenResult {
  readonly type = 'cancelled';
}

/**
 * Indicates that there was a unknown error
 */
export class GooglePayOpenUnknownError extends GooglePayOpenResult {
  readonly type = 'unknownError';
}

/**
 * Indicates that Google Pay utils were not configured before trying to open Google Pay.
 * Configure utils via configureGooglePayUtils(...) method
 */
export class GooglePayOpenNotConfigured extends GooglePayOpenResult {
  readonly type = 'notConfigured';
}
