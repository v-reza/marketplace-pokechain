import { setNotification } from "@/redux/action/notificationActions";
import { useAxios } from "@/utils/axiosInstance";
import { Spinner } from "flowbite-react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { buyItemsWithToken } from "../../schema/mutation";

const WithToken = ({ item, setLoadingButton, loadingButton, setOpen }) => {
  const axiosInstance = useAxios();
  const dispatchRedux = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: mutationWithToken, isLoading } = useMutation({
    mutationFn: (data) =>
      buyItemsWithToken(axiosInstance, item.increment_id, data),
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
        onClick={() => !loadingButton && mutationWithToken({ item })}
        className={`mt-3 w-full inline-flex justify-center rounded-md border ${
          loadingButton
            ? "bg-gray-600 hover:bg-gray-700border-gray-300 cursor-not-allowed"
            : "border-amber-300 bg-amber-500 hover:bg-amber-600 cursor-pointer"
        }  shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:text-sm`}
      >
        {isLoading || loadingButton ? (
          <Spinner color="gray" aria-label="Purple spinner example" />
        ) : (
          "Use Token"
        )}
      </button>
    </div>
  );
};

export default WithToken;
