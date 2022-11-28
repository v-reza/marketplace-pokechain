import { publicRequest } from "@/utils/axiosInstance"

export const getAllBundle = async (page = 0,selectedItem,selectedRarity,selected) => {
  const response = await publicRequest.get(`/bundle?page=${page}&filterItem=${selectedItem}&filterRarity=${selectedRarity}&filterSelected=${selected}`)
  return response.data
}