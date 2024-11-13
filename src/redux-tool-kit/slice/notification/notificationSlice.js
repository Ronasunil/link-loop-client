import { createSlice } from "@reduxjs/toolkit";

const initialState = { notifications: [] };

const notificationSlice = createSlice({
  initialState,
  name: "notifications",
  reducers: {
    initNotification(state, action) {
      const { notifications } = action.payload;
      state.notifications = notifications;
    },

    addNotification(state, action) {
      const { notification } = action.payload;
      state.notifications.unshift(notification);
    },

    markAsReadNotification(state, action) {
      const { notificationId } = action.payload;
      state.notifications = state.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      );
    },

    deleteNotification(state, action) {
      const { id } = action.payload;
      state.notifications = state.notifications.filter((notification) => notification.id !== id);
    },
  },
});

export const { addNotification, deleteNotification, markAsReadNotification, initNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
