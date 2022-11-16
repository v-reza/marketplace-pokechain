import { publicRequest } from "@/utils/axiosInstance";

export const getBackpackPokemon = async (axiosInstance) => {
  const response = await axiosInstance.get("/backpack/pokemon");
  return response.data;
};

export const getPokemonEvolution = async (name) => {
  const response = await publicRequest.get(`/pokemon/evolution/${name}`);
  return response.data;
};

export const getBackpackItems = async (axiosInstance) => {
  const response = await axiosInstance.get("/backpack/items");
  return response.data;
};

export const getActivityToken = async(axiosInstance) => {
  const response = await axiosInstance.get("/backpack/activity/token");
  return response.data;
}