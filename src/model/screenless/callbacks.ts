import type { Notifications } from "./notifications";
import type { Redirects } from "./redirects";

/**
 * Class storing the information about callbacks
 */
export class Callbacks {
  redirects: Redirects | null;
  notifications: Notifications | null;

  /**
   * @param redirects - where should user be redirected after payment
   * @param notifications - where should payment notifications be sent
   */
  constructor(
    redirects: Redirects | null,
    notifications: Notifications | null
  ) {
    this.redirects = redirects;
    this.notifications = notifications;
  }
}
