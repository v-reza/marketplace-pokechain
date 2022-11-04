import { publicRequest, userRequest } from "@/utils/axiosInstance";

export const login = async (dispatch, data, processAction) => {
  processAction({
    error: null,
    loading: true,
    message: null,
    access_token: null,
  });
  try {
    const response = await publicRequest.post("/auth/login", data);
    const { msg, accessToken } = response.data;
    processAction({
      error: false,
      loading: false,
      message: msg,
      access_token: accessToken,
    });
  } catch (e) {
    const { msg } = e.response.data;
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

export const logout = async (processAction) => {
  const response = await publicRequest.delete("/auth/logout");
  console.log(response)
  // const { msg } = response.data;
  // processAction({
  //   error: false,
  //   loading: false,
  //   message: msg,
  //   access_token: null,
  // });
};
