import { addNotification, markAsReadNotification } from "@rtk/slice/notification/notificationSlice";
import store from "@rtk/store";
import { staticService } from "@utils/staticService";
import { io } from "socket.io-client";

class Socket {
  socket;

  constructor(userId) {
    this.userId = userId;
  }
  socketConnection() {
    this.socket = io(process.env.API_URL, { secure: true, transports: ["websocket"] });
    this.socketConnectionEvents();
  }

  socketConnectionEvents() {
    this.socket.on("connect", () => {
      console.log("socket client connected");
    });

    this.socket.on("disconnect", (msg) => {
      console.log(`socket client disconnected ${msg}`);
      this.socket.connect();
    });

    this.socketConnection.on("connect_error", (msg) => {
      console.log(`socket client disconnected ${msg}`);
      this.socket.connect();
    });

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

export const socket = new Socket();
