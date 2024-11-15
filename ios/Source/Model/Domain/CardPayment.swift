import Tpay

struct CardPayment: Transaction {

    // MARK: - Properties

    let amount: Double
    let description: String
    let payerContext: PayerContext?
    let hiddenDescription: String?
    let paymentChannel: Headless.Models.PaymentChannel
    let card: Headless.Models.Card?
    let cardToken: Headless.Models.CardToken?
    let callbacks: CallbacksConfiguration
}
