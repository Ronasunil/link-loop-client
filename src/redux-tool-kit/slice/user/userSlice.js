import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "", profile: {}, isLoggedIn: false };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.profile = action.payload.profile;
    },

    deleteUser(state) {
      state.isLoggedIn = false;
      state.profile = {};
      state.token = "";
    },
  },
});

export const { createUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
