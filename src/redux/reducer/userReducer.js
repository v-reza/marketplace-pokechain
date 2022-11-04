import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload.user
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE'+action.payload)
      state.currentUser = action.payload.user
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUserState = (state) => state.user;

export default userSlice.reducer;
