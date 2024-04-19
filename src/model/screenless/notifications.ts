/** 
 * Class responsible for storing information about notifications
 */
export class Notifications {
  url: string;
  email: string;

  /**
   * @param url - notification url, payment notifications will be sent there
   * @param email - notification email, payment notifications will be sent there
   */
  constructor(url: string, email: string) {
    this.url = url;
    this.email = email;
  }
}
