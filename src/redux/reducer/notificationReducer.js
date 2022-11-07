import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isNotification: false,
    isSuccess: null,
    message: null,
  },
  reducers: {
    loadIsStart: (state) => {
      state.isNotification = false;
      state.isSuccess = null;
      state.message = false;
    },
    loadIsSuccess: (state, action) => {
      state.isNotification = true;
      state.isSuccess = true;
      state.message = action.payload.message;
    },
    loadIsFailed: (state, action) => {
      state.isNotification = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    },
  },
});

export const { loadIsStart, loadIsSuccess, loadIsFailed } =
  notificationSlice.actions;

export default notificationSlice.reducer;
