import { publicRequest, userRequest } from "@/utils/axiosInstance";
import {
  setUser
} from "@/redux/reducer/userReducer";

export const setDecodeUser = async (dispatch,data) => {
  dispatch(
    setUser({user:data})
  );  
};
