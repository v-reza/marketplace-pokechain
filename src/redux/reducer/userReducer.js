import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import jwtDecode from "jwt-decode";

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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (typeof window !== "undefined") {
        const access_token = localStorage.getItem("access_token");

        if (access_token) {
          const { userId, email, username, exp, profile, refresh_token } =
            jwtDecode(access_token);
          const data = {
            userId,
            email,
            username,
            exp,
            profile,
            refresh_token,
          };
          state.currentUser = data;
        }
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUserState = (state) => state.user;

export default userSlice.reducer;
