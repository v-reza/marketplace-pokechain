import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { createContext, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setDecodeUser } from "@/redux/action/userActions";
import { publicRequest } from "@/utils/axiosInstance";

const initalState = {
  access_token:
    typeof window !== "undefined" && localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null,
  refresh_token:
    typeof window !== "undefined" && localStorage.getItem("refresh_token")
      ? localStorage.getItem("refresh_token")
      : null,
  isAuthenticated:
    typeof window !== "undefined" && localStorage.getItem("access_token")
      ? true
      : false,
};

export const AuthContext = createContext(initalState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initalState);
  const { currentUser } = useUser();
  const dispatchRedux = useDispatch();
  const router = useRouter();
  const [acc,secAcc] = useState(null)
 
  useEffect(() => {
    const saveState = async () => {
      if (state?.access_token) {
        const expired = jwtDecode(state.access_token).exp;
        let checkExpired = expired * 1000 < new Date().getTime() ? true : false;
        if (checkExpired) {
          const response = await publicRequest.get("/auth/token", {
            params: {
              refreshToken: state.refresh_token,
            },
          });

          const { accessToken } = response.data;
      
          localStorage.setItem("access_token", accessToken);
          state.access_token = accessToken;
          secAcc(accessToken)
          const {
            userIdUpdated: userId,
            emailUpdated: email,
            usernameUpdated: username,
            exp,
            profileUpdated: profile,
            refreshTokenUpdated: refresh_token,
          } =  jwtDecode(acc);
          console.log(userId)
          const data = {
            userId,
            email,
            username,
            exp,
            profile,
            refresh_token,
          };
          setDecodeUser(dispatchRedux, data);
        }else{
          const {
            userIdUpdated: userId,
            emailUpdated: email,
            usernameUpdated: username,
            exp,
            profileUpdated: profile,
            refreshTokenUpdated: refresh_token,
          } = jwtDecode(state.access_token);
  
          const data = {
            userId,
            email,
            username,
            exp,
            profile,
            refresh_token,
          };
          setDecodeUser(dispatchRedux, data);
        }

        
      }
    };
    saveState();
  }, [state?.access_token,state?.refresh_token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
