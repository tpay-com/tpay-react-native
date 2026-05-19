extension Transportation {

    struct ApplePayFinalizePayment: Decodable {

        // MARK: - Properties

        let transactionId: String
        let applePayToken: String
    }
}
