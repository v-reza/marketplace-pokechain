import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setDecodeUser, useSetDecodeUser } from "@/redux/action/userActions";
import { setUser } from "@/redux/reducer/userReducer";

const initalState = {
  access_token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
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

  useEffect(() => {
    const saveState = async () => {
      if (state?.access_token) {
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
        dispatchRedux(setUser({ user: data }));
      }
    };
    saveState();
  }, [state?.access_token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
