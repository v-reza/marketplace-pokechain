import { publicRequest } from "@/utils/axiosInstance";

export const getAllPokemon = async (page = 0,selected,selectedElement) => {
  const response = await publicRequest.get(`/pokemon?page=${page}&filterSelected=${selected}&filterElement=${selectedElement}`);
  return response.data;
};

export const getPokemonByIncrementId = async (id) => {
  const response = await publicRequest.get(`/pokemon/${id}`);
  return response.data;
};

