export const buyItemsWithMidtrans = async (axiosInstance, data) => {
  const response = await axiosInstance.post("/transaction/create/snap", data);
  return response.data;
};

export const buyItemsWithBalance = async (
  axiosInstance,
  increment_id,
  data
) => {
  const response = await axiosInstance.post(
    `/transaction/buy/items/${increment_id}/with/ballance`,
    data
  );
  return response.data;
};

export const buyItemsWithToken = async (axiosInstance, increment_id, data) => {
  const response = await axiosInstance.post(
    `/transaction/buy/items/${increment_id}/with/token`,
    data
  );
  return response.data;
};

export const getPaymentItemsNotificationId = async (axiosInstance, data) => {
  const response = await axiosInstance.post(`/transaction/midtrans/status/notification`, data);
  return response.data;
}