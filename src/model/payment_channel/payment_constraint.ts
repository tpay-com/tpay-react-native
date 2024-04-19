/**
 * Class indicating that there is a payment constraint on a payment channel
 */
export class PaymentConstraint {
  /**
   * type of a payment constraint
   */
  type: PaymentConstraintType;

  constructor(type: PaymentConstraintType) {
    this.type = type;
  }
}

/**
 * Enum describing available payment constraint types
 */
export enum PaymentConstraintType {
  amount = "amount",
}

/**
 * Class responsible for storing information about amount payment constraint
 */
export class AmountPaymentConstraint extends PaymentConstraint {
  /**
   * minimum price that can be used while creating the transaction
   */
  minimum: number | null | undefined;

  /**
   * maximum price that can be used while creating the transaction
   */
  maximum: number | null | undefined;

  constructor(minimum: number | null, maximum: number | null) {
    super(PaymentConstraintType.amount);
    this.minimum = minimum;
    this.maximum = maximum;
  }
}
