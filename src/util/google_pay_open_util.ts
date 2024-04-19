import {
  GooglePayOpenCancelled,
  GooglePayOpenNotConfigured,
  type GooglePayOpenResult,
  GooglePayOpenSuccess,
  GooglePayOpenUnknownError,
} from '../model/result/google_pay_open_result';

const success = 'success';
const cancelled = 'cancelled';
const unknownError = 'unknownError';

export function mapGooglePayOpenResult(json: string): GooglePayOpenResult {
  const object = JSON.parse(json);

  switch (object.type) {
    case success:
      return new GooglePayOpenSuccess(
        object.token,
        object.description,
        object.cardNetwork,
        object.cardTail
      );
    case cancelled:
      return new GooglePayOpenCancelled();
    case unknownError:
      return new GooglePayOpenUnknownError();
    default:
      return new GooglePayOpenNotConfigured();
  }
}
