import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    sakokfsa:null
  },
  reducers: {
    loadIsStart: (state) => {
      state.accessToken=null
    },
    loadIsSuccess: (state, action) => {
      state.accessToken=action.payload.accessToken
    },
    loadIsFailed: (state, action) => {
      state.accessToken=null
    },
  },
});

export const { loadIsStart, loadIsSuccess, loadIsFailed } = authSlice.actions;

export default authSlice.reducer;
