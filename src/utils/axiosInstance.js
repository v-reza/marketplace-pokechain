import useAuth from "@/hooks/useAuth";
import axios from "axios";
import jwtDecode from "jwt-decode";

const baseURL = "http://localhost:5000/api/v1/";

export const useAxios = () => {
  const { access_token, dispatch } = useAuth();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const { exp, refresh_token } = jwtDecode(access_token);
    if (exp * 1000 < new Date().getTime()) {
      try {
        const response = await publicRequest.get("/auth/token", {
          params: {
            refreshToken: refresh_token,
          },
        });
        const { accessToken } = response.data;

        localStorage.setItem("access_token", accessToken);
        req.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch({ type: "LOGOUT" });
      }
    }
    return req;
  });

  return axiosInstance;
};

export const publicRequest = axios.create({
  baseURL: baseURL,
});
