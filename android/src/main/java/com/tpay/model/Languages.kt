package com.tpay.model

import com.tpay.sdk.api.models.Language
import org.json.JSONObject

data class Languages(
  val preferredLanguage: Language,
  val supportedLanguages: List<Language>
) {
  companion object {
    private const val PREFERRED_LANGUAGE = "preferredLanguage"
    private const val SUPPORTED_LANGUAGES_ARRAY = "supportedLanguages"

    fun fromJson(json: JSONObject): Languages {
      val supportedLanguagesArray = json.getJSONArray(SUPPORTED_LANGUAGES_ARRAY)
      return Languages(
        preferredLanguage = Language.values()[json.getInt(PREFERRED_LANGUAGE)],
        supportedLanguages = (0 until supportedLanguagesArray.length()).map { index ->
          Language.values()[index.toInt()]
        }
      )
    }
  }
}