import { publicRequest } from "@/utils/axiosInstance"

export const getRecentSales = async () => {
  const response = await publicRequest.get("/marketplace/recent-sales")
  return response.data
}
