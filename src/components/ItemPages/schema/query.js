import { publicRequest } from "@/utils/axiosInstance";

export const getAllItems = async (page = 0, sort, filterItem, filterRarity) => {
  const response = await publicRequest.get(`/item?page=${page}&sort=${sort}&filter-item=${filterItem}&filter-rarity=${filterRarity}`);
  return response.data;
};

export const getItemsById = async (id) => {
  const response = await publicRequest.get(`/item/${id}`);
  return response.data;
}

