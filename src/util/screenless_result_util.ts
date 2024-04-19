import {
  ScreenlessBlikAmbiguousAlias,
  ScreenlessConfiguredPaymentFailed,
  ScreenlessMethodCallError,
  ScreenlessPaid,
  ScreenlessPaymentCreated,
  ScreenlessPaymentError,
  type ScreenlessResult,
  ScreenlessValidationError,
} from '../model/result/screenless_result';
import { AmbiguousAlias } from 'react-native-tpay';

const paid = 'paid';
const configuredPaymentFailed = 'configuredPaymentFailed';
const ambiguousAlias = 'ambiguousAlias';
const error = 'error';
const paymentCreated = 'paymentCreated';
const validationError = 'validationError';
const methodCallError = 'methodCallError';
const unknownScreenlessResult = 'Unknown screenless result type';

export function mapScreenlessResult(json: string): ScreenlessResult {
  const object = JSON.parse(json);

  switch (object.type) {
    case paid:
      return new ScreenlessPaid(object.transactionId);
    case configuredPaymentFailed:
      return new ScreenlessConfiguredPaymentFailed(
        object.transactionId,
        object.message
      );
    case paymentCreated:
      return new ScreenlessPaymentCreated(
        object.transactionId,
        object.paymentUrl
      );
    case ambiguousAlias:
      const aliases: Array<AmbiguousAlias> = object.aliases;
      return new ScreenlessBlikAmbiguousAlias(object.transactionId, aliases);
    case methodCallError:
      return new ScreenlessMethodCallError(object.message);
    case error:
      return new ScreenlessPaymentError(object.message);
    case validationError:
      return new ScreenlessValidationError(object.message);
    default:
      throw Error(unknownScreenlessResult);
  }
}
