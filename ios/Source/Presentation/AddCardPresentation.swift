import React
import Tpay

final class AddCardPresentation: AddCardDelegate {

    // MARK: - Properties

    var addCardResult: ((String) -> Void)?

    private var addCardSheet: AddCard.Sheet?
    private let currnetViewController = RCTPresentedViewController()

    // MARK: - API

    func presentAddCard(for payer: Payer) throws {
        addCardSheet = AddCard.Sheet(payer: payer, delegate: self)

        guard let currnetViewController = currnetViewController else {
            return
        }

        try addCardSheet?.present(from: currnetViewController)
    }

    // MARK: - AddCardDelegate

    func onTokenizationCompleted() {
        addCardResult?(ConfigurationResult.tokenizationCompleted().toJson())
        complete()
    }

    func onTokenizationCancelled() {
        addCardResult?(ConfigurationResult.tokenizationCancelled().toJson())
        complete()
    }

    // MARK: - Private

    private func complete() {
        addCardSheet?.dismiss()
        addCardSheet = nil
    }
}
