package com.tpay

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.Promise
import com.tpay.model.TpayConfiguration
import org.json.JSONArray
import org.json.JSONObject
import com.tpay.extension.*
import com.tpay.util.TpayUtil
import com.tpay.util.JsonUtil
import com.tpay.sdk.api.payment.*
import com.tpay.delegate.*
import com.tpay.util.TpayBackpressUtil
import com.tpay.sdk.api.models.*
import android.content.Intent
import com.tpay.sdk.api.addCard.*
import android.app.Activity
import com.tpay.sdk.api.cardTokenPayment.*
import com.tpay.model.screenless.*
import com.tpay.sdk.api.screenless.blik.*
import com.tpay.sdk.api.screenless.googlePay.*
import com.tpay.model.googlePay.*
import com.tpay.sdk.api.screenless.channelMethods.*

class TpayModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
  private var sheet: Presentable? = null
  private var googlePayUtil: GooglePayUtil? = null
  private var openGooglePayPromise: Promise? = null

  init {
    reactContext.addActivityEventListener(this)
  }

  override fun getName(): String = NAME

  @ReactMethod
  fun configure(configuration: String, promise: Promise) = catchAndHandleException(promise) {
    val tpayConfiguration = TpayConfiguration.fromJson(configuration)
    tpayConfiguration.validate()
    TpayUtil.configure(tpayConfiguration)
    handleResult(TpayResult.ConfigurationSuccess, promise)
  }

  @ReactMethod
  fun startPayment(json: String, promise: Promise) = handleActivity(promise) {
    val transaction = JsonUtil.getSingleTransaction(json)
    transaction.validate()
    Payment.Sheet(
      transaction = transaction,
      activity = this,
      supportFragmentManager = supportFragmentManager
    ).apply {
      addObserver(PaymentDelegateImpl(this) { tpayResult ->
        handleResult(tpayResult, promise)
      })
      handleSheetOpenResult(this, present(), promise)
    }
  }

  @ReactMethod
  fun tokenizeCard(json: String, promise: Promise) = handleActivity(promise) {
    val tokenization = JsonUtil.getTokenization(json)
    AddCard.Sheet(
      tokenization = tokenization,
      activity = this,
      supportFragmentManager = supportFragmentManager
    ).apply {
      addObserver(AddCardDelegateImpl(this) { tpayResult ->
        handleResult(tpayResult, promise)
      })
      handleSheetOpenResult(this, present(), promise)
    }
  }

  @ReactMethod
  fun startCardTokenPayment(json: String, promise: Promise) = handleActivity(promise) {
    val transaction = JsonUtil.getCardTokenTransaction(json)
    transaction.validate()
    CardTokenPayment.Sheet(
      transaction = transaction,
      activity = this,
      supportFragmentManager = supportFragmentManager
    ).apply {
      addObserver(PaymentDelegateImpl(this) { tpayResult ->
        handleResult(tpayResult, promise)
      })
      handleSheetOpenResult(this, present(), promise)
    }
  }

  @ReactMethod
  fun screenlessBLIKPayment(json: String, promise: Promise) = handleScreenlessPayment<BLIKScreenlessPayment>(json, promise)

  @ReactMethod
  fun screenlessTransferPayment(json: String, promise: Promise) = handleScreenlessPayment<TransferScreenlessPayment>(json, promise)

  @ReactMethod
  fun screenlessRatyPekaoPayment(json: String, promise: Promise) = handleScreenlessPayment<RatyPekaoScreenlessPayment>(json, promise)

  @ReactMethod
  fun screenlessCreditCardPayment(json: String, promise: Promise) = handleScreenlessPayment<CreditCardScreenlessPayment>(json, promise)

  @ReactMethod
  fun screenlessGooglePayPayment(json: String, promise: Promise) = handleScreenlessPayment<GooglePayScreenlessPayment>(json, promise)

  @ReactMethod
  fun screenlessApplePayPayment(json: String, promise: Promise) {
    handleScreenlessResult(TpayScreenlessResult.MethodCallError(APPLE_PAY_NOT_AVAILABLE), promise)
  }

  @ReactMethod
  fun screenlessAmbiguousBLIKPayment(json: String, promise: Promise) = catchAndHandleScreenlessException(promise) {
    val payment = AmbiguousBLIKPayment.fromJson(json)
    TpayAmbiguousBLIKPaymentHandler(payment) { screenlessResult ->
      handleScreenlessResult(screenlessResult, promise)
    }
  }

  @ReactMethod
  fun configureGooglePayUtils(json: String, promise: Promise) = catchAndHandleGooglePayConfigurationException(promise) {
    (reactContext.currentActivity as? ReactActivity)?.run {
      val googlePayConfiguration = GooglePayUtilsConfiguration.fromJson(json)
      googlePayConfiguration.validate()
      googlePayUtil = GooglePayUtil(
        activity = this,
        googlePayRequest = GooglePayRequest(
          price = googlePayConfiguration.price,
          merchantName = googlePayConfiguration.merchantName,
          merchantId = googlePayConfiguration.merchantId
        ),
        googlePayEnvironment = googlePayConfiguration.environment,
        customRequestCode = googlePayConfiguration.customRequestCode
      )
      handleGooglePayConfigurationResult(GooglePayConfigureResult.Success, promise)
    } ?: handleGooglePayConfigurationResult(GooglePayConfigureResult.Error(ACTIVITY_NULL_MESSAGE), promise)
  }

  @ReactMethod
  fun isGooglePayAvailable(promise: Promise) {
    googlePayUtil?.checkIfGooglePayIsAvailable(promise::resolve) ?: promise.resolve(false)
  }

  @ReactMethod
  fun openGooglePay(promise: Promise) {
    googlePayUtil?.run {
      openGooglePayPromise = promise
      openGooglePay()
    } ?: handleGooglePayOpenResult(null, promise)
  }

  @ReactMethod
  fun getAvailablePaymentChannels(promise: Promise) {
    GetPaymentChannels().execute { result -> handlePaymentChannelsResult(result, promise) }
  }

  private fun handlePaymentChannelsResult(result: GetPaymentChannelsResult, promise: Promise) {
    JSONObject().apply {
      when (result) {
        is GetPaymentChannelsResult.Success -> {
          put(TYPE, SUCCESS)
          put(CHANNELS, result.channels.filter { channel -> channel.isAvailable }.toJsonArray())
        }

        is GetPaymentChannelsResult.Error -> {
          put(TYPE, ERROR)
          put(MESSAGE, result.devErrorMessage)
        }
      }
    }.toString().let(promise::resolve)
  }

  private fun handleGooglePayOpenResult(
    openGooglePayResult: OpenGooglePayResult?,
    promise: Promise
  ) {
    JSONObject().apply {
      when (openGooglePayResult) {
        is OpenGooglePayResult.Success -> {
          put(TYPE, GOOGLE_PAY_OPEN_SUCCESS)
          put(GOOGLE_PAY_TOKEN, openGooglePayResult.token)
          put(GOOGLE_PAY_DESCRIPTION, openGooglePayResult.description)
          put(GOOGLE_PAY_CARD_NETWORK, openGooglePayResult.cardNetwork)
          put(GOOGLE_PAY_CARD_TAIL, openGooglePayResult.cardTail)
        }

        is OpenGooglePayResult.Cancelled -> {
          put(TYPE, GOOGLE_PAY_OPEN_CANCELLED)
        }

        is OpenGooglePayResult.UnknownError -> {
          put(TYPE, GOOGLE_PAY_OPEN_UNKNOWN_ERROR)
        }

        else -> {
          put(TYPE, GOOGLE_PAY_OPEN_NOT_CONFIGURED)
        }
      }
    }.toString().let(promise::resolve)
  }

  fun handleActivity(promise: Promise, block: ReactActivity.() -> Unit) {
    (reactContext.currentActivity as? ReactActivity)?.run {
      runOnUiThread {
        try {
          block(this)
        } catch (exception: Exception) {
          handleException(promise, exception)
        }
      }
    } ?: handleResult(TpayResult.MethodCallError(ACTIVITY_NULL_MESSAGE), promise)
  }

  fun handleException(promise: Promise, exception: Exception) {
    handleResult(
      if (exception is ValidationException) {
        TpayResult.ValidationError(exception.message ?: UNKNOWN_VALIDATION_ERROR_MESSAGE)
      } else {
        TpayResult.MethodCallError(exception.message ?: UNKNOWN_ERROR)
      }, promise
    )
  }

  private fun handleScreenlessException(exception: Exception, promise: Promise) {
    handleScreenlessResult(
      if (exception is ValidationException) {
        TpayScreenlessResult.ValidationError(exception.message ?: UNKNOWN_VALIDATION_ERROR_MESSAGE)
      } else {
        TpayScreenlessResult.MethodCallError(exception.message ?: UNKNOWN_ERROR)
      }, promise
    )
  }

  private fun handleGooglePayConfigurationException(exception: Exception, promise: Promise) {
    handleGooglePayConfigurationResult(
      GooglePayConfigureResult.Error(
        if (exception is ValidationException) exception.message
        else GOOGLE_PAY_CONFIGURATION_INVALID
      ),
      promise
    )
  }

  fun catchAndHandleException(promise: Promise, block: () -> Unit) {
    try {
      block()
    } catch (exception: Exception) {
      handleException(promise, exception)
    }
  }

  fun catchAndHandleScreenlessException(promise: Promise, block: () -> Unit) {
    try {
      block()
    } catch (exception: Exception) {
      handleScreenlessException(exception, promise)
    }
  }

  fun catchAndHandleGooglePayConfigurationException(promise: Promise, block: () -> Unit) {
    try {
      block()
    } catch (exception: Exception) {
      handleGooglePayConfigurationException(exception, promise)
    }
  }

  private inline fun <reified T : ScreenlessPayment> handleScreenlessPayment(json: String, promise: Promise) {
    try {
      val payment = when (T::class) {
        BLIKScreenlessPayment::class -> BLIKScreenlessPayment(json)
        TransferScreenlessPayment::class -> TransferScreenlessPayment(json)
        RatyPekaoScreenlessPayment::class -> RatyPekaoScreenlessPayment(json)
        CreditCardScreenlessPayment::class -> CreditCardScreenlessPayment(json)
        GooglePayScreenlessPayment::class -> GooglePayScreenlessPayment(json)
        else -> throw IllegalArgumentException(NOT_IMPLEMENTED_SCREENLESS_PAYMENT_MESSAGE)
      }
      payment.validate()
      TpayScreenlessPaymentHandler(payment) { screenlessResult ->
        handleScreenlessResult(screenlessResult, promise)
      }
    } catch (exception: Exception) {
      handleScreenlessException(exception, promise)
    }
  }

  private fun handleGooglePayConfigurationResult(
    googlePayConfigureResult: GooglePayConfigureResult,
    promise: Promise
  ) {
    val (type, errorMessage) = when (googlePayConfigureResult) {
      is GooglePayConfigureResult.Success -> GOOGLE_PAY_CONFIGURATION_SUCCESS to null
      is GooglePayConfigureResult.Error -> GOOGLE_PAY_CONFIGURATION_ERROR to googlePayConfigureResult.errorMessage
    }

    JSONObject().apply {
      put(TYPE, type)
      put(MESSAGE, errorMessage)
    }.toString().let(promise::resolve)
  }

  fun handleResult(tpayResult: TpayResult, promise: Promise) {
    val (type, value) = when (tpayResult) {
      is TpayResult.ConfigurationSuccess -> CONFIGURATION_SUCCESS to null
      is TpayResult.ValidationError -> VALIDATION_ERROR to tpayResult.message
      is TpayResult.PaymentCompleted -> PAYMENT_COMPLETED to tpayResult.transactionId
      is TpayResult.PaymentCancelled -> PAYMENT_CANCELLED to tpayResult.transactionId
      is TpayResult.TokenizationCompleted -> TOKENIZATION_COMPLETED to null
      is TpayResult.TokenizationFailure -> TOKENIZATION_FAILURE to null
      is TpayResult.MethodCallError -> METHOD_CALL_ERROR to tpayResult.message
      is TpayResult.ModuleClosed -> MODULE_CLOSED to null
    }

    JSONObject().apply {
      put(TYPE, type)
      put(VALUE, value)
    }.toString().let(promise::resolve)
  }

  private fun handleScreenlessResult(
    screenlessResult: TpayScreenlessResult,
    promise: Promise
  ) {
    val data = when (screenlessResult) {
      is TpayScreenlessResult.Paid -> {
        ScreenlessResultData(
          type = PAID,
          transactionId = screenlessResult.transactionId
        )
      }

      is TpayScreenlessResult.PaymentCreated -> {
        ScreenlessResultData(
          type = PAYMENT_CREATED,
          transactionId = screenlessResult.transactionId,
          paymentUrl = screenlessResult.paymentUrl
        )
      }

      is TpayScreenlessResult.ConfiguredPaymentFailed -> {
        ScreenlessResultData(
          type = CONFIGURED_PAYMENT_FAILED,
          transactionId = screenlessResult.transactionId,
          message = screenlessResult.errorMessage
        )
      }

      is TpayScreenlessResult.BlikAmbiguousAlias -> {
        ScreenlessResultData(
          type = AMBIGUOUS_ALIAS,
          transactionId = screenlessResult.transactionId,
          ambiguousAliases = screenlessResult.ambiguousAliases
        )
      }

      is TpayScreenlessResult.Error -> {
        ScreenlessResultData(
          type = ERROR,
          message = screenlessResult.errorMessage
        )
      }

      is TpayScreenlessResult.ValidationError -> {
        ScreenlessResultData(
          type = VALIDATION_ERROR,
          message = screenlessResult.message
        )
      }

      is TpayScreenlessResult.MethodCallError -> {
        ScreenlessResultData(
          type = METHOD_CALL_ERROR,
          message = screenlessResult.message
        )
      }
    }

    JSONObject().apply {
      put(TYPE, data.type)
      put(TRANSACTION_ID, data.transactionId)
      put(MESSAGE, data.message)
      put(PAYMENT_URL, data.paymentUrl)
      data.ambiguousAliases?.let { aliases ->
        put(
          ALIASES,
          JSONArray().apply {
            aliases.map { alias -> JSONObject(alias.toJson()) }.forEach(this::put)
          }
        )
      }
    }.toString().let(promise::resolve)
  }

  private fun handleSheetOpenResult(
    presentable: Presentable,
    sheetOpenResult: SheetOpenResult,
    promise: Promise
  ) {
    when (sheetOpenResult) {
      is SheetOpenResult.Success -> {
        sheet = presentable
        TpayBackpressUtil.set(presentable)
      }

      is SheetOpenResult.ConfigurationInvalid -> {
        handleResult(
          TpayResult.ValidationError(
            CONFIGURATION_INVALID_MESSAGE + sheetOpenResult.devMessage
          ), promise
        )
      }

      is SheetOpenResult.UnexpectedError -> {
        handleResult(
          TpayResult.MethodCallError(sheetOpenResult.devErrorMessage ?: UNKNOWN_ERROR),
          promise
        )
      }
    }
  }

  override fun onActivityResult(
    activity: Activity?,
    requestCode: Int,
    resultCode: Int,
    intent: Intent?
  ) {
    (sheet as? Payment.Sheet)?.onActivityResult(requestCode, resultCode, intent)
    googlePayUtil?.handleActivityResult(requestCode, resultCode, intent) { result ->
      openGooglePayPromise?.run {
        handleGooglePayOpenResult(result, this)
        openGooglePayPromise = null
      }
    }
  }

  override fun onNewIntent(intent: Intent) {}

  private data class ScreenlessResultData(
    val type: String,
    val transactionId: String? = null,
    val message: String? = null,
    val paymentUrl: String? = null,
    val ambiguousAliases: List<AmbiguousAlias> = emptyList()
  )

  companion object {
    const val NAME = "Tpay"

    private const val METHOD_CHANNEL_NAME = "tpay"
    private const val CONFIGURE_METHOD = "configure"
    private const val CONFIGURE_SCREENLESS_METHOD = "configureScreenless"
    private const val START_PAYMENT_METHOD = "startPayment"
    private const val TOKENIZE_CARD = "tokenizeCard"
    private const val SCREENLESS_BLIK_PAYMENT_METHOD = "screenlessBLIKPayment"
    private const val SCREENLESS_AMBIGUOUS_BLIK_PAYMENT_METHOD = "screenlessAmbiguousBLIKPayment"
    private const val SCREENLESS_TRANSFER_PAYMENT_METHOD = "screenlessTransferPayment"
    private const val SCREENLESS_CREDIT_CARD_PAYMENT_METHOD = "screenlessCreditCardPayment"
    private const val SCREENLESS_GOOGLE_PAY_PAYMENT_METHOD = "screenlessGooglePayPayment"
    private const val AVAILABLE_PAYMENT_METHODS_METHOD = "availablePaymentMethods"
    private const val CONFIGURE_GOOGLE_PAY_UTILS_METHOD = "configureGooglePayUtils"
    private const val OPEN_GOOGLE_PAY_METHOD = "openGooglePay"
    private const val IS_GOOGLE_PAY_AVAILABLE_METHOD = "isGooglePayAvailable"

    private const val START_CARD_TOKEN_TRANSACTION_METHOD = "startCardTokenPayment"
    private const val CONFIGURATION_NULL_MESSAGE = "Configuration cannot be null"
    private const val CONFIGURATION_INVALID_MESSAGE = "Configuration invalid: "
    private const val TRANSACTION_NULL_MESSAGE = "Transaction cannot be null"
    private const val UNKNOWN_CONFIGURATION_ERROR_MESSAGE = "Unknown configuration error"
    private const val PAYER_NULL_MESSAGE = "Payer cannot be null"
    private const val TOKEN_PAYMENT_NULL_MESSAGE = "CardTokenPayment cannot be null"
    private const val UNKNOWN_VALIDATION_ERROR_MESSAGE = "Unknown validation error"
    private const val ACTIVITY_NULL_MESSAGE = "Activity cannot be null"
    private const val UNKNOWN_ERROR = "Unknown error"
    private const val SCREENLESS_BLIK_NULL_MESSAGE = "Screenless BLIK cannot be null"
    private const val SCREENLESS_TRANSFER_NULL_MESSAGE = "Screenless transfer cannot be null"
    const val NOT_IMPLEMENTED_SCREENLESS_PAYMENT_MESSAGE = "Not implemented screenless payment type"
    const val NOT_IMPLEMENTED_CONFIGURATION_TYPE_MESSAGE = "Not implemented configuration type"
    private const val GOOGLE_PAY_CONFIGURATION_NULL_MESSAGE = "Google Pay configuration cannot be null"
    private const val GOOGLE_PAY_CONFIGURATION_INVALID = "Google Pay configuration is invalid"
    private const val APPLE_PAY_NOT_AVAILABLE = "Apple Pay is not available on Android"

    private const val CONFIGURATION_SUCCESS = "configurationSuccess"
    private const val VALIDATION_ERROR = "validationError"
    private const val PAYMENT_COMPLETED = "paymentCompleted"
    private const val PAYMENT_CANCELLED = "paymentCancelled"
    private const val TOKENIZATION_COMPLETED = "tokenizationCompleted"
    private const val TOKENIZATION_FAILURE = "tokenizationFailure"
    private const val METHOD_CALL_ERROR = "methodCallError"
    private const val MODULE_CLOSED = "moduleClosed"

    private const val PAYMENT_METHODS = "paymentMethods"
    private const val SUCCESS = "success"
    private const val PAID = "paid"
    private const val PAYMENT_CREATED = "paymentCreated"
    private const val CONFIGURED_PAYMENT_FAILED = "configuredPaymentFailed"
    private const val ERROR = "error"
    private const val DEV_ERROR_MESSAGE = "devErrorMessage"
    private const val AMBIGUOUS_ALIAS = "ambiguousAlias"
    private const val ALIASES = "aliases"

    private const val CHANNELS = "channels"

    private const val TYPE = "type"
    private const val VALUE = "value"
    private const val TRANSACTION_ID = "transactionId"
    private const val MESSAGE = "message"
    private const val PAYMENT_URL = "paymentUrl"

    private const val GOOGLE_PAY_CONFIGURATION_SUCCESS = "success"
    private const val GOOGLE_PAY_CONFIGURATION_ERROR = "error"

    private const val GOOGLE_PAY_OPEN_SUCCESS = "success"
    private const val GOOGLE_PAY_OPEN_CANCELLED = "cancelled"
    private const val GOOGLE_PAY_OPEN_UNKNOWN_ERROR = "unknownError"
    private const val GOOGLE_PAY_OPEN_NOT_CONFIGURED = "notConfigured"

    private const val GOOGLE_PAY_TOKEN = "token"
    private const val GOOGLE_PAY_DESCRIPTION = "description"
    private const val GOOGLE_PAY_CARD_NETWORK = "cardNetwork"
    private const val GOOGLE_PAY_CARD_TAIL = "cardTail"
  }
}
