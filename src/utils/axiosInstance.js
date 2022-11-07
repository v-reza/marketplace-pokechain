import useAuth from "@/hooks/useAuth";
import axios from "axios";
import jwtDecode from "jwt-decode";

const baseURL = "http://localhost:5000/api/v1/";

export const useAxios = () => {
  const { access_token } = useAuth();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    const { exp, refresh_token } = jwtDecode(access_token);
    if (exp * 1000 < new Date().getTime()) {
      const response = await publicRequest.get("/auth/token", {
        params: {
          refreshToken: refresh_token,
        },
      });
      const { accessToken } = response.data;
      localStorage.setItem("access_token", JSON.stringify(accessToken));
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  });

  return axiosInstance;
};

export const publicRequest = axios.create({
  baseURL: baseURL,
});
