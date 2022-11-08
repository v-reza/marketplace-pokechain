import { setNotification } from "@/redux/action/notificationActions";
import { publicRequest } from "@/utils/axiosInstance";
import jwtDecode from "jwt-decode";

// fetch with accessToke

export const login = async ({ dispatch, dispatchRedux }, data, cb) => {
  //cb = (callback)
  cb({
    error: null,
    loading: true,
    message: null,
  });
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await publicRequest.post("/auth/login", data);
    const { msg, accessToken } = response.data;
    const { refresh_token } = jwtDecode(accessToken);
    cb({
      error: false,
      loading: false,
      message: msg,
    });
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        access_token: accessToken,
      },
    });
    if (msg) {
      setNotification(dispatchRedux, { message: msg, error: false });
    }

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refresh_token);
  } catch (e) {
    const { msg } = e.response.data;
    cb({
      error: true,
      loading: false,
      message: msg,
    });
    dispatch({ type: "LOGIN_FAILED" });
    if (msg) {
      setNotification(dispatchRedux, { message: msg, error: true });
    }
  }
};

export const register = async (dispatch, data, cb) => {
  //cb = (callback)
  cb({
    error: null,
    loading: true,
    message: null,
  });
  try {
    const response = await publicRequest.post("/auth/register", data);
    const { msg } = response.data;
    cb({
      error: false,
      loading: false,
      message: msg,
    });
    if (msg) {
      setNotification(dispatch, { message: msg, error: false });
    }
  } catch (e) {
    const { msg } = e.response.data;
    cb({
      error: true,
      loading: false,
      message: msg,
    });
    if (msg) {
      setNotification(dispatch, { message: msg, error: true });
    }
  }
};

export const logout = async ({ dispatch, dispatchRedux }, data) => {
  console.log(data);
  //cb = (callback)
  try {
    const response = await publicRequest.delete("/auth/logout", {
      data: { refresh_token: data },
    });
    const { msg } = response.data;
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    if (msg) {
      setNotification(dispatchRedux, { message: msg, error: false });
    }
  } catch (e) {
    const { msg } = e.response.data;
    if (msg) {
      setNotification(dispatch, { message: msg, error: true });
    }
  }
};

export const fetchUser = async (axiosInstance) => {
  const response = await axiosInstance.get("/auth/users");
  console.log(response);
};
