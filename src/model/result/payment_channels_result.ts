import type { PaymentChannel } from '../payment_channel/payment_channel';

/**
 * Indicates a result of payment channels
 */
export class PaymentChannelsResult {}

/**
 * Indicates that payment channels were successfully received
 */
export class PaymentChannelsSuccess extends PaymentChannelsResult {
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
  /**
   * Error message
   */
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
