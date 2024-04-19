package com.tpay

import com.tpay.model.screenless.*
import com.tpay.sdk.api.screenless.blik.*
import com.tpay.sdk.api.screenless.transfer.*
import com.tpay.sdk.api.screenless.card.*
import com.tpay.sdk.api.screenless.googlePay.*
import com.tpay.sdk.api.screenless.PaymentDetails
import com.tpay.sdk.api.screenless.LongPollingConfig
import com.tpay.sdk.api.screenless.TransactionState
import com.tpay.sdk.api.screenless.pekaoInstallment.*

object TpayScreenlessResultHandler {
  fun handleCreditCardCreateResult(
    createResult: CreateCreditCardTransactionResult
  ): TpayScreenlessResult {
    return when (createResult) {
      is CreateCreditCardTransactionResult.Created -> {
        TpayScreenlessResult.PaymentCreated(
          createResult.transactionId,
          createResult.paymentUrl
        )
      }

      is CreateCreditCardTransactionResult.CreatedAndPaid -> {
        TpayScreenlessResult.Paid(createResult.transactionId)
      }

      is CreateCreditCardTransactionResult.Error -> {
        TpayScreenlessResult.Error(createResult.errorMessage)
      }
    }
  }

  fun handleTransferCreateResult(
    createResult: CreateTransferTransactionResult
  ): TpayScreenlessResult {
    return when (createResult) {
      is CreateTransferTransactionResult.Created -> {
        TpayScreenlessResult.PaymentCreated(
          createResult.transactionId,
          createResult.paymentUrl
        )
      }

      is CreateTransferTransactionResult.Error -> {
        TpayScreenlessResult.Error(createResult.errorMessage)
      }
    }
  }

  fun handleRatyPekaoCreateResult(
    createResult: CreatePekaoInstallmentTransactionResult
  ): TpayScreenlessResult {
    return when (createResult) {
      is CreatePekaoInstallmentTransactionResult.Created -> {
        TpayScreenlessResult.PaymentCreated(
          createResult.transactionId,
          createResult.paymentUrl
        )
      }

      is CreatePekaoInstallmentTransactionResult.Error -> {
        TpayScreenlessResult.Error(createResult.devErrorMessage)
      }
    }
  }

  fun handleBLIKCreateResult(
    createResult: CreateBLIKTransactionResult
  ): TpayScreenlessResult {
    return when (createResult) {
      is CreateBLIKTransactionResult.Created -> {
        TpayScreenlessResult.PaymentCreated(createResult.transactionId, null)
      }

      is CreateBLIKTransactionResult.CreatedAndPaid -> {
        TpayScreenlessResult.Paid(createResult.transactionId)
      }

      is CreateBLIKTransactionResult.ConfiguredPaymentFailed -> {
        TpayScreenlessResult.ConfiguredPaymentFailed(
          createResult.transactionId,
          createResult.errorMessage
        )
      }

      is CreateBLIKTransactionResult.AmbiguousBlikAlias -> {
        TpayScreenlessResult.BlikAmbiguousAlias(
          createResult.transactionId,
          createResult.aliases
        )
      }

      is CreateBLIKTransactionResult.Error -> {
        TpayScreenlessResult.Error(createResult.errorMessage)
      }
    }
  }

  fun handleGooglePayCreateResult(
    createResult: CreateGooglePayTransactionResult
  ): TpayScreenlessResult {
    return when (createResult) {
      is CreateGooglePayTransactionResult.Created -> {
        TpayScreenlessResult.PaymentCreated(
          createResult.transactionId,
          createResult.paymentUrl
        )
      }

      is CreateGooglePayTransactionResult.CreatedAndPaid -> {
        TpayScreenlessResult.Paid(createResult.transactionId)
      }

      is CreateGooglePayTransactionResult.Error -> {
        TpayScreenlessResult.Error(createResult.errorMessage)
      }
    }
  }
}