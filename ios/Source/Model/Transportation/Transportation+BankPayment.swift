extension Transportation {

    struct BankPayment: Decodable {

        // MARK: - Properties

        let channelId: Int
        let bankName: String
        let paymentDetails: PaymentDetails
        let payer: Payer
        let callbacks: Callbacks
    }
}
