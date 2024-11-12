import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@rtk/slice/user/userSlice";
import { user } from "@utils/User";

const getUser = async function () {
  return await user.getCurrentUser();
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: await getUser(),
  },
});

export default store;
