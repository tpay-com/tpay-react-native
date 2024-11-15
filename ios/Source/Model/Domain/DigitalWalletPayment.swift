import Tpay

struct DigitalWalletPayment: Transaction {

    // MARK: - Properties

    let amount: Double
    let description: String
    let payerContext: PayerContext?
    let hiddenDescription: String?
    let paymentChannel: Headless.Models.PaymentChannel
    let token: String
    let callbacks: CallbacksConfiguration
}
