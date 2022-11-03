import { publicRequest, userRequest } from "@/utils/axiosInstance";
import {
  loadIsStart,
  loadIsSuccess,
  loadIsFailed,
} from "@/redux/reducer/authReducer";

export const login = async (dispatch, data, processAction) => {
  dispatch(loadIsStart());
  processAction({
    error: false,
    loading: true,
    message: null,
    access_token: null,
  });
  try {
    const response = await publicRequest.post("/auth/login", data);
    const { msg, accessToken } = response.data;
    dispatch(
      loadIsSuccess({
        accessToken,
      })
    );
    processAction({
      error: false,
      loading: false,
      message: msg,
      access_token: accessToken,
    });
  } catch (e) {
    const { msg } = e.response.data;
    dispatch(loadIsFailed());
    processAction({
      error: true,
      loading: false,
      message: msg,
      access_token: null,
    });
  }
};

export const register = async (data, processAction) => {
  processAction({
    error: false,
    loading: true,
    message: null,
  });
  try {
    const response = await publicRequest.post("/auth/register", data);
    const { msg } = response.data;
    processAction({
      error: false,
      loading: false,
      message: msg,
    });
  } catch (e) {
    const { msg } = e.response.data;
    processAction({
      error: true,
      loading: false,
      message: msg,
    });
  }
};
