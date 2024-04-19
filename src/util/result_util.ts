import { MethodCallError } from '../model/result/result';
import { PaymentCompleted } from '../model/result/result';
import { ConfigurationSuccess } from '../model/result/result';
import { PaymentCancelled } from '../model/result/result';
import { ValidationError } from '../model/result/result';
import { TokenizationCompleted } from '../model/result/result';
import { TokenizationFailure } from '../model/result/result';
import { ModuleClosed } from '../model/result/result';
import { Result } from '../model/result/result';

const configurationSuccess = 'configurationSuccess';
const validationError = 'validationError';
const paymentCompleted = 'paymentCompleted';
const paymentCancelled = 'paymentCancelled';
const tokenizationCompleted = 'tokenizationCompleted';
const tokenizationFailure = 'tokenizationFailure';
const methodCallError = 'methodCallError';
const moduleClosed = 'moduleClosed';
const unknownResult = 'Unknown result type';

export function mapResult(json: string): Result {
  const object = JSON.parse(json);

  switch (object.type) {
    case configurationSuccess:
      return new ConfigurationSuccess();
    case validationError:
      return new ValidationError(object.value);
    case paymentCompleted:
      return new PaymentCompleted(object.value);
    case paymentCancelled:
      return new PaymentCancelled(object.value);
    case tokenizationCompleted:
      return new TokenizationCompleted();
    case tokenizationFailure:
      return new TokenizationFailure();
    case methodCallError:
      return new MethodCallError(object.value);
    case moduleClosed:
      return new ModuleClosed();
    default:
      throw Error(unknownResult);
  }
}
