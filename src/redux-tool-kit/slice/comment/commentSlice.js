import { createSlice } from "@reduxjs/toolkit";

const initialState = { comments: [] };
const commentSlice = createSlice({
  name: "comments",
  initialState,

  reducers: {
    addComment(state, action) {
      state.comments = action.payload.comments;
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
