import type { PaymentConstraint } from './payment_constraint';

/**
 * Class responsible for storing information about a payment channel
 */
export class PaymentChannel {
  /**
   * id of the payment channel
   */
  id: string;

  /**
   * channel display name
   */
  name: string;

  /**
   * channel image url
   */
  imageUrl: string;

  /**
   * channel constraints
   */
  constraints: Array<PaymentConstraint>;

  constructor(
    id: string,
    name: string,
    imageUrl: string,
    constraints: Array<PaymentConstraint>
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.constraints = constraints;
  }
}
