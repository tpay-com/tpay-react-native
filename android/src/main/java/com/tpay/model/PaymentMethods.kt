package com.tpay.model

import org.json.JSONObject
import com.tpay.sdk.api.models.PaymentMethod
import com.tpay.sdk.api.models.DigitalWallet
import com.tpay.sdk.api.models.InstallmentPayment
import com.tpay.extension.ValidationException

class PaymentMethods(val methods: List<PaymentMethod>) {
  companion object {
    private const val UNKNOWN_PAYMENT_METHOD_MESSAGE = "Unknown payment method"
    private const val UNKNOWN_DIGITAL_WALLET_MESSAGE = "Unknown digital wallet"
    private const val UNKNOWN_INSTALLMENT_PAYMENT_MESSAGE = "Unknown installment payment"
    private const val DEFINE_PAYMENT_METHODS_MESSAGE = "Define payment methods"
    private const val APPLE_PAY_INDEX = 1
    private const val METHODS_ARRAY = "methods"
    private const val WALLETS_ARRAY = "wallets"
    private const val INSTALLMENT_PAYMENTS_ARRAY = "installmentPayments"
    private const val BLIK_INDEX = 0
    private const val TRANSFER_INDEX = 1
    private const val CARD_INDEX = 2
    private const val RATY_PEKAO_INDEX = 0

    fun fromJson(json: JSONObject): PaymentMethods {
      val paymentMethodsArray = json.getJSONArray(METHODS_ARRAY)
      val digitalWalletsArray = json.optJSONArray(WALLETS_ARRAY)
      val installmentPaymentsArray = json.optJSONArray(INSTALLMENT_PAYMENTS_ARRAY)

      val wallets = digitalWalletsArray?.let { array ->
        (0 until array.length())
          .map { index -> array.getInt(index) }
          .filter { value -> value != APPLE_PAY_INDEX }
          .map { value ->
            when (value) {
              DigitalWallet.GOOGLE_PAY.ordinal -> DigitalWallet.GOOGLE_PAY
              else -> throw ValidationException(UNKNOWN_DIGITAL_WALLET_MESSAGE)
            }
          }
      } ?: emptyList()

      val installmentPayments = installmentPaymentsArray?.let { array ->
        (0 until array.length())
          .map { index -> array.getInt(index) }
          .map { value ->
            when (value) {
              RATY_PEKAO_INDEX -> InstallmentPayment.RATY_PEKAO
              else -> throw ValidationException(UNKNOWN_INSTALLMENT_PAYMENT_MESSAGE)
            }
          }
      } ?: emptyList()

      val paymentMethods = (0 until paymentMethodsArray.length())
        .map { index -> paymentMethodsArray.getInt(index) }
        .map { index ->
          when (index) {
            BLIK_INDEX -> PaymentMethod.Blik
            TRANSFER_INDEX -> PaymentMethod.Pbl
            CARD_INDEX -> PaymentMethod.Card
            else -> throw ValidationException(UNKNOWN_PAYMENT_METHOD_MESSAGE)
          }
        }
        .let { methods ->
          if (wallets.isNotEmpty()) {
            methods + PaymentMethod.DigitalWallets(wallets)
          } else {
            methods
          }
        }
        .let { methods ->
          if (installmentPayments.isNotEmpty()) {
            methods + PaymentMethod.InstallmentPayments(installmentPayments)
          } else {
            methods
          }
        }

      if (paymentMethods.isEmpty()) {
        throw ValidationException(DEFINE_PAYMENT_METHODS_MESSAGE)
      }

      return PaymentMethods(methods = paymentMethods)
    }
  }
}