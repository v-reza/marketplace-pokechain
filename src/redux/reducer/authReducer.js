import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { publicRequest } from "@/utils/axiosInstance";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    loadIsStart: (state) => {
      state.accessToken = null;
    },
    loadIsSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    loadIsFailed: (state, action) => {
      state.accessToken = null;
    },
  },
  extraReducers: {
    [HYDRATE]: async (state, action) => {
      if (typeof window !== "undefined") {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
          const { exp } = jwtDecode(access_token)
          // console.log(exp)
          state.accessToken = access_token;
          
          // logic refresh token here
          // const res = await publicRequest.get("")

          // if (exp * 1000 < new Date().getTime()) {
          //   const res = axios.get("")
          // }
        }
      }
    },
  },
});

export const { loadIsStart, loadIsSuccess, loadIsFailed } = authSlice.actions;

export default authSlice.reducer;
