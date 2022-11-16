import { publicRequest } from "@/utils/axiosInstance";

export const getRecentSales = async (type = "pokemon") => {
  const response = await publicRequest.get(
    `/marketplace/recent-sales?type=${type}`
  );
  return response.data;
};

export const getRecentListings = async (type = "pokemon") => {
  const response = await publicRequest.get(
    `/marketplace/recent-listings?type=${type}`
  );
  return response.data;
};
