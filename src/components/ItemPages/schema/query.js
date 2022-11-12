import { publicRequest } from "@/utils/axiosInstance"

export const getAllItems = async (page = 0) => {
  const response = await publicRequest.get(`/item?page=${page}`)
  return response.data
}