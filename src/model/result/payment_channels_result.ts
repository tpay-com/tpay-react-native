import type { PaymentChannel } from '../payment_channel/payment_channel';

/**
 * Indicates a result of payment channels
 */
export abstract class PaymentChannelsResult {
  /**
   * Type identifier for the result
   */
  abstract readonly type: string;

  /**
   * Optional error message or additional information
   */
  message?: string;

  /**
   * Payment channels array when available
   */
  channels?: Array<PaymentChannel>;
}

/**
 * Indicates that payment channels were successfully received
 */
export class PaymentChannelsSuccess extends PaymentChannelsResult {
  readonly type = 'success';
  /**
   * Payment channels
   */
  channels: Array<PaymentChannel>;

  constructor(channels: Array<PaymentChannel>) {
    super();
    this.channels = channels;
  }
}

/**
 * Indicates that there was an error while fetching payment channels
 */
export class PaymentChannelsError extends PaymentChannelsResult {
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
