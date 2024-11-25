import { staticService } from "@utils/staticService";
import { addNotification, markAsReadNotification } from "@rtk/slice/notification/notificationSlice";
import store from "@rtk/store";
import Socket from "./Socket";

export default class NotificationSocket {
  constructor(userId) {
    this.userId = userId;
    this.socket = new Socket().socket;

    this.setupEvents();
  }
  setupEvents() {
    this.socket.on("added notification", (notification, extraInfo) => {
      const { userTo } = extraInfo;
      console.log(userTo, this.userId);
      if (userTo === this.userId) {
        staticService.displayInAppNotification("You have an unseen notification");
        store.dispatch(addNotification(notification));
      }
    });

    this.socket.on("updated notification", (notification, extraInfo) => {
      const { userTo, notificationId } = extraInfo;
      console.log(userTo, this.userId);

      if (userTo === this.userId) store.dispatch(markAsReadNotification({ notificationId }));
    });
  }
}
