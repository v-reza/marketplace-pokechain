import { publicRequest, userRequest } from "@/utils/axiosInstance";
import {
  setUser
} from "@/redux/reducer/userReducer";
import { useDispatch } from "react-redux";

export const useSetDecodeUser = async (data) => {
  const dispatch = useDispatch()
  dispatch(
    setUser({user:data})
  );  
};
