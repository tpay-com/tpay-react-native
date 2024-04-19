import type { Language } from "./language";

/**
 * Class responsible for storing information about module languages.
 */
export class Languages {
  preferredLanguage: Language;
  supportedLanguages: Array<Language>;

  /**
   * @param {Language} preferredLanguage - module will open in this language
   * @param {Array<Language>} supportedLanguages - languages that user will be able to use in module
   */
  constructor(
    preferredLanguage: Language,
    supportedLanguages: Array<Language>
  ) {
    this.preferredLanguage = preferredLanguage;
    this.supportedLanguages = supportedLanguages;
  }
}
