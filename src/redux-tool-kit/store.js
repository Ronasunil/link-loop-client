import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@rtk/slice/user/userSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
