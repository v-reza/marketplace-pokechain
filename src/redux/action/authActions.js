// import { publicRequest, userRequest } from "@/utils/axiosInstance";
import { axiosInstance, publicRequest } from "@/utils/axiosInstance";
import {
  authIsStart,
  authIsSuccess,
  authIsFailed,
} from "@/contexts/AuthAction";
import { setIsAuthenticated } from "../reducer/userReducer";

export const register = async (data, processAction) => {
  processAction({
    error: null,
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

export const logout = async (dispatch, processAction, data) => {
  const response = await publicRequest.delete("/auth/logout", { data });
  const { msg } = response.data;
  processAction({
    error: false,
    loading: false,
    message: msg,
  });
  dispatch(loadIsFailed());
};

export const fetchUser = async (data) => {
  const response = await axiosInstance.get("/auth/users");
  console.log(response);
};
