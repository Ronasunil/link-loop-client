import { createSlice } from "@reduxjs/toolkit";

const initialState = { posts: [] };
const allPostslice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    initPost(state, action) {
      state.posts = action.payload.posts;
    },
    addPost(state, action) {
      state.posts.push(action.payload.post);
    },

    changePost(state, action) {
      const { postId, newPost } = action.payload;
      state.posts = state.posts.map((post) => (post._id === postId ? newPost : post));
    },

    updatePost(state, action) {
      const { id, updatedValues } = action.payload;
      state.posts = state.posts.map((post) => (post._id === id ? { ...post, ...updatedValues } : post));
    },

    deletePost(state, action) {
      const { id } = action.payload;
      state.posts = state.posts.filter((post) => post._id !== id);
    },
  },
});

export const { initPost, changePost, addPost, deletePost, updatePost } = allPostslice.actions;
export default allPostslice.reducer;
