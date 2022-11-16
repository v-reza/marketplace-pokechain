import { publicRequest } from "../utils/axiosInstance";

export const getUserById = async (id) => {
  const response = await publicRequest.get(`/user/${id}`);
  return response.data;
};
