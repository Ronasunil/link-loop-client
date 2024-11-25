import { createSlice } from "@reduxjs/toolkit";

const initialState = { reactions: [] };

const reactionsSlice = createSlice({
  name: "reactions",
  initialState,

  reducers: {
    addReaction(state, action) {
      const { reactions } = action.payload;
      state.reactions = reactions;
    },
  },
});

export const { addReaction } = reactionsSlice.actions;
export default reactionsSlice.reducer;
