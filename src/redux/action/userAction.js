import { publicRequest, userRequest } from "@/utils/axiosInstance";
import {
  loadIsStart,
  loadIsSuccess,
  loadIsFailed,
} from "@/redux/reducer/authReducer";

export const login = async (dispatch, data) => {
  dispatch(loadIsStart());
  try {
    const response = await publicRequest.post("/auth/login", data);
    const { msg, accessToken } = response.data;
    dispatch(
      loadIsSuccess({
        ...data,
        login: true,
        message: msg,
        accessToken,
      })
    );
  } catch (e) {
    const { msg } = e.response.data;
    dispatch(loadIsFailed({ message: msg }));
  }
};

export const register = async (dispatch, data, processAction) => {
  dispatch(loadIsStart());
  processAction({
    error: false,
    loading: true,
    message: null,
  });
  try {
    const response = await publicRequest.post("/auth/register", data);
    const { msg } = response.data;
    dispatch(
      loadIsSuccess({
        ...data,
        register: true,
        message: msg,
      })
    );
    processAction({
      error: false,
      loading: false,
      message: msg,
    });
  } catch (e) {
    const { msg } = e.response.data;
    dispatch(loadIsFailed({ message: msg }));
    processAction({
      error: true,
      loading: false,
      message: msg,
    });
  }
};
