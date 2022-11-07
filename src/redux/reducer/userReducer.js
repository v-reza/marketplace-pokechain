import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
