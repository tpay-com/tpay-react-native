extension Transportation {

    struct ApplePayInitPayment: Decodable {

        // MARK: - Properties

        let paymentDetails: PaymentDetails
        let payer: T.Payer
        let callbacks: Callbacks
    }
}
