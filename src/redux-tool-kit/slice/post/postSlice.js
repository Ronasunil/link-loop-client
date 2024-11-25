import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {
    image: "",
    video: "",
    bgColor: "",
    feelings: "",
    profilePic: "",
    privacy: "public",
    gifUrl: "",
    content: "",
    isLoading: false,
    postId: "",
  },
};
const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    addPostValues(state, action) {
      for (let key in action.payload) {
        state.post[key] = action.payload[key];
      }
    },

    clearPost(state) {
      state.post = { ...initialState.post };
    },

    deleteImg(state) {
      state.post.image = "";
    },
  },
});

export const { addPostValues, clearPost, deleteImg } = postSlice.actions;
export default postSlice.reducer;
