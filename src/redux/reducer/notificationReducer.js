import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isNotification: false,
    isSuccess: null,
    message: null,
  },
  reducers: {
    notificationStart: (state) => {
      state.isNotification = false;
      state.isSuccess = null;
      state.message = false;
    },
    notificationSuccess: (state, action) => {
      state.isNotification = true;
      state.isSuccess = true;
      state.message = action.payload.message;
    },
    notificationFailed: (state, action) => {
      state.isNotification = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    },
    notificationReset: (state) => {
      state.isNotification = false;
      state.isSuccess = null;
      state.message = null;
    },
  },
});

export const {
  notificationStart,
  notificationSuccess,
  notificationFailed,
  notificationReset,
} = notificationSlice.actions;

export default notificationSlice.reducer;
