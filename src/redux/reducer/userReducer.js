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
        const access_token_string = JSON.parse(localStorage.getItem("persist:auth")).accessToken;
        const access_token = JSON.parse(access_token_string)
        if (access_token) {
          const { userIdUpdated, emailUpdated, usernameUpdated, exp, profileUpdated, refreshTokenUpdated } =
            jwtDecode(access_token);
          const data = {
            userId:userIdUpdated,
            email:emailUpdated,
            username:usernameUpdated,
            exp,
            profile:profileUpdated,
            refresh_token:refreshTokenUpdated,
          };
          state.currentUser = data;
        }
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
