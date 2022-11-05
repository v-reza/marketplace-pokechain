import { publicRequest } from "@/utils/axiosInstance";
import axios from "axios"
export const authIsStart = (dispatch) => {
  return dispatch({ type: "LOGIN_START" });
};

export const authIsSuccess = (dispatch, data) => {
  return dispatch({ type: "LOGIN_SUCCESS", payload: {
    access_token: data
  }});
};

export const authIsFailed = (dispatch) => {
  return dispatch({ type: "LOGIN_FAILED" });
};

export const login = async (dispatch, data, cb) => {
  //cb = (callback)
  cb({
    error: null,
    loading: true,
    message: null,
  });
  dispatch(authIsStart(dispatch));
  try {
    const response = await publicRequest.post("/auth/login", data);
    const { msg, accessToken } = response.data;
    cb({
      error: false,
      loading: false,
      message: msg,
    });
    localStorage.setItem("access_token", accessToken);
    dispatch(authIsSuccess(dispatch, accessToken))
    await axios.get("/api/hello")
  } catch (e) {
    const { message } = e;
    cb({
      error: true,
      loading: false,
      message
    });
    dispatch(authIsFailed(dispatch));
  }
};
