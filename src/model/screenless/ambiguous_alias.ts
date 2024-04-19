/**
 * Class responsible for storing ambiguous alias information
 */
export class AmbiguousAlias {
  /**
   * Alias display name
   */
  name: string;

  /**
   * Alias identifier
   */
  code: string;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}
