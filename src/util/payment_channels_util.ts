import {
  PaymentChannelsError,
  type PaymentChannelsResult,
  PaymentChannelsSuccess,
} from '../model/result/payment_channels_result';

const success = 'success';
const error = 'error';
const unknownType = 'Unknown result type';

export function mapPaymentChannelsResult(json: string): PaymentChannelsResult {
  const object = JSON.parse(json);

  switch (object.type) {
    case success:
      return new PaymentChannelsSuccess(object.channels);
    case error:
      return new PaymentChannelsError(object.message);
    default:
      throw Error(unknownType);
  }
}
