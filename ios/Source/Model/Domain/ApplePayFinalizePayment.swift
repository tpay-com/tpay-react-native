import Tpay

struct ApplePayFinalizePayment {

    // MARK: - Properties

    let transactionId: String
    let applePayToken: String
    let paymentChannel: Headless.Models.PaymentChannel
}
