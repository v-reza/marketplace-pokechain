import { setNotification } from "@/redux/action/notificationActions";
import { useAxios } from "@/utils/axiosInstance";
import { Spinner } from "flowbite-react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { buyItemsWithBalance } from "../../schema/mutation";

const WithBalance = ({ item, loadingButton, setLoadingButton, setOpen }) => {
  const axiosInstance = useAxios();
  const dispatchRedux = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: mutationWithBallance, isLoading } = useMutation({
    mutationFn: (data) =>
      buyItemsWithBalance(axiosInstance, item.increment_id, data),
    onMutate: () => {
      setLoadingButton(true);
    },
    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries("detailItem");
      setNotification(dispatchRedux, { message: data.message, error: false });
    },
    onError: (err) => {
      setNotification(dispatchRedux, {
        message: err.response.data.message,
        error: true,
      });
    },
  });
  return (
    <div>
      <button
        type="button"
        disabled={loadingButton}
        onClick={() => !loadingButton && mutationWithBallance({ item })}
        className={`mt-3 w-full inline-flex justify-center rounded-md border ${
          loadingButton
            ? "bg-gray-600 hover:bg-gray-700border-gray-300 cursor-not-allowed"
            : "border-green-300 bg-green-500 hover:bg-green-600 cursor-pointer"
        }  shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:text-sm`}
      >
        {isLoading || loadingButton ? (
          <Spinner color="gray" aria-label="Purple spinner example" />
        ) : (
          "Use Balance"
        )}
      </button>
    </div>
  );
};

export default WithBalance;
