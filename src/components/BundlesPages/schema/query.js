import { publicRequest } from "@/utils/axiosInstance"

export const getAllBundle = async (page = 0) => {
  const response = await publicRequest.get(`/bundle?page=${page}`)
  return response.data
}