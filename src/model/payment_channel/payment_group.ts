/**
 * Class responsible for storing payment group's information
 */
export class PaymentGroup {
  /**
   * id of the group
   */
  id: string;

  /**
   * group's display name
   */
  name: string;

  /**
   * group's image url
   */
  imageUrl: string;

  constructor(id: string, name: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
