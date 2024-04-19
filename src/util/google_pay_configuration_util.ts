import {
  GooglePayConfigureError,
  type GooglePayConfigureResult,
  GooglePayConfigureSuccess,
} from '../model/result/google_pay_configure_result';

const success = 'success';
const error = 'error';
const unknownGooglePayConfigurationResult =
  'Unknown Google Pay configuration result';

export function mapGooglePayConfigurationResult(
  json: string
): GooglePayConfigureResult {
  const object = JSON.parse(json);

  switch (object.type) {
    case success:
      return new GooglePayConfigureSuccess();
    case error:
      return new GooglePayConfigureError(object.message);
    default:
      throw Error(unknownGooglePayConfigurationResult);
  }
}
