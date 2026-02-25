package com.tpay.delegate

import com.tpay.sdk.api.addCard.*
import com.tpay.TpayResult

class AddCardDelegateImpl(
  private val sheet: AddCard.Sheet,
  private val onCleanup: () -> Unit,
  private val onResult: (TpayResult) -> Unit
) : AddCardDelegate {
  override fun onAddCardSuccess(tokenizationId: String?) {
    onResult(TpayResult.TokenizationCompleted)
    remove()
  }

  override fun onAddCardFailure() {
    onResult(TpayResult.TokenizationFailure)
    remove()
  }

  override fun onModuleClosed() {
    onResult(TpayResult.ModuleClosed)
    remove()
  }

  private fun remove() {
    sheet.removeObserver()
    onCleanup()
  }
}
