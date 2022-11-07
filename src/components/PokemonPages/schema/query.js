import { publicRequest } from "@/utils/axiosInstance"

export const getAllPokemon = async (page = 0) => {
  const response = await publicRequest.get(`/pokemon?page=${page}`)
  return response.data
}