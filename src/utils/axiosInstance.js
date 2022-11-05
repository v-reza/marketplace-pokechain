import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://localhost:5000/api/v1/";
let access_token_string;
let token;
if (typeof window !== "undefined") {
  access_token_string = localStorage.getItem("persist:auth")
    ? JSON.parse(localStorage.getItem("persist:auth")).accessToken
    : null;
  if (access_token_string) {
    token = JSON.parse(access_token_string);
  }
}
console.log(token);

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!access_token_string) {
    if (typeof window !== "undefined") {
      access_token_string = localStorage.getItem("persist:auth")
        ? JSON.parse(localStorage.getItem("persist:auth")).accessToken
        : null;
      if (access_token_string) {
        token = JSON.parse(access_token_string);
      }
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  const user = jwt_decode(token);
  const currentDate = new Date();
  if (user.exp * 1000 < currentDate.getTime()) {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auth/token",
      {
        params: {
          refreshToken: user.refreshTokenUpdated,
        },
      }
    );
    localStorage.setItem("persist:auth", {
      accessToken: JSON.stringify(response.data.accessToken),
    });
    req.headers.Authorization = `Bearer ${response.data.accessToken}`;
  }
  return req;
});

export const publicRequest = axios.create({
  baseURL: baseURL,
});
