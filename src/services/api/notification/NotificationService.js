import axios from "@services/axios";

class NotificationService {
  async getNotification() {
    try {
      const res = await axios.get("/notifications");
      return res.data.notifications;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async markAsRead(notificationId) {
    try {
      const res = await axios.patch(`/notifications/read/${notificationId}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export const notificationService = new NotificationService();
