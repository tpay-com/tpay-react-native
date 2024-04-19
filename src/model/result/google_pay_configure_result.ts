
/**
 * Indicates a result of Google Pay configuration
 */
export class GooglePayConfigureResult {}

/**
 * Indicates that Google Pay configuration was successful
 */
export class GooglePayConfigureSuccess extends GooglePayConfigureResult {}

/**
 * Indicates that there was an error during Google Pay configuration
 */
export class GooglePayConfigureError extends GooglePayConfigureResult {
  /**
   * Error message
   */
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
