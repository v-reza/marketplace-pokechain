import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    loadIsStart: (state) => {
      state.currentUser = null;
    },
    loadIsSuccess: (state, action) => {
      state.currentUser = action.payload.user;
    },
    loadIsFailed: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loadIsStart, loadIsSuccess, loadIsFailed } = userSlice.actions;

export default userSlice.reducer;
