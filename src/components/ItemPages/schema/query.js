import { publicRequest } from "@/utils/axiosInstance";

export const getAllItems = async (page = 0) => {
  const response = await publicRequest.get(`/item?page=${page}`);
  return response.data;
};

export const getItemsById = async (id) => {
  const response = await publicRequest.get(`/item/${id}`);
  return response.data;
}