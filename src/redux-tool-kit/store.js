import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@rtk/slice/user/userSlice";
import notificationReducer from "@rtk/slice/notification/notificationSlice";
import modalReducer from "@rtk/slice/modal/modalSlice";
import postReducer from "@rtk/slice/post/postSlice";
import allPostReducer from "@rtk/slice/allPost/allPostSlice";
import reactionsReducer from "@rtk/slice/reaction/reactionSlice";
import commentReducer from "@rtk/slice/comment/commentSlice";
import { user } from "@utils/User";

const getUser = async function () {
  return await user.getCurrentUser();
};

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationReducer,
    modal: modalReducer,
    post: postReducer,
    allPosts: allPostReducer,
    reactions: reactionsReducer,
    comment: commentReducer,
  },
  preloadedState: {
    user: await getUser(),
  },
});

export default store;
