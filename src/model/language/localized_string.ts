import type { Language } from "./language";

/**
 * Class responsible for storing a localized string
 */
export class LocalizedString {
  language: Language;
  value: string;

  constructor(language: Language, value: string) {
    this.language = language;
    this.value = value;
  }
}
