export const sellBackpackItems = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/backpack/sell/items", data);
  return response.data;
};

export const verifyPassword = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/backpack/verify/password", data);
  return response.data;
};

export const convertBalanceToToken = async (axiosInstance, data) => {
  const response = await axiosInstance.put(
    "/backpack/convert/to/token",
    data
  );
  return response.data;
};

export const convertTokenToBalance = async (axiosInstance, data) => {
  const response = await axiosInstance.put("/backpack/convert/to/balance", data);
  return response.data;
};


export const sellBackpackToken = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/backpack/sell/token", data);
  return response.data;
}