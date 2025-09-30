
/**
 * Indicates a result of Google Pay configuration
 */
export abstract class GooglePayConfigureResult {
  /**
   * Type identifier for the result
   */
  abstract readonly type: string;

  /**
   * Optional error message or additional information
   */
  message?: string;
}

/**
 * Indicates that Google Pay configuration was successful
 */
export class GooglePayConfigureSuccess extends GooglePayConfigureResult {
  readonly type = 'success';
}

/**
 * Indicates that there was an error during Google Pay configuration
 */
export class GooglePayConfigureError extends GooglePayConfigureResult {
  readonly type = 'error';
  /**
   * Error message
   */
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
