import Tpay

struct PayPoPayment: Transaction {

    // MARK: - Properties

    let amount: Double
    let description: String
    let payerContext: PayerContext?
    let hiddenDescription: String?
    let paymentChannel: Headless.Models.PaymentChannel
    let callbacks: CallbacksConfiguration
}
