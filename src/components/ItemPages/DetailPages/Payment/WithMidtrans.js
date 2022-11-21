import { setNotification } from "@/redux/action/notificationActions";
import { useAxios } from "@/utils/axiosInstance";
import { Spinner } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import {
  buyItemsWithMidtrans,
  getPaymentItemsNotificationId,
} from "../../schema/mutation";

const WithMidtrans = ({ item, loadingButton, setLoadingButton, setOpen }) => {
  const axiosInstance = useAxios();
  const dispatchRedux = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: mutationStatusTransaction } = useMutation({
    mutationFn: (data) => getPaymentItemsNotificationId(axiosInstance, data),
    onSuccess: (data) => {
      if (data.status === 200) {
        setOpen(false);
        queryClient.invalidateQueries("detailItem");
        setNotification(dispatchRedux, { message: data.message, error: false });
      } else {
        setNotification(dispatchRedux, {
          message: data.message,
          error: true,
        });
      }
    },
    onError: (err) => {
      setNotification(dispatchRedux, {
        message: err.response.data.message,
        error: true,
      });
    },
  });

  const { mutate: mutationMidtrans, isLoading } = useMutation({
    mutationFn: (data) => buyItemsWithMidtrans(axiosInstance, data),
    onSuccess: (data) => {
      setLoadingButton(false);
      window.snap.pay(`${data.snap_token}`, {
        onSuccess: function (result) {
          setOpen(false);
          mutationStatusTransaction({
            type: "items",
            increment_id: item.increment_id,
            order_id: result.order_id,
          });
        },
        onPending: (pending) => {
          setOpen(false);
          setNotification(dispatchRedux, {
            message: "Transaction error or pending, please try again",
            error: true,
          });
        },
        onError: (err) => {
          setOpen(false);
          setNotification(dispatchRedux, {
            message: "Transaction error or pending, please try again",
            error: true,
          });
        },
      });
    },
    onMutate: () => {
      setLoadingButton(true);
    },
  });
  return (
    <div>
      <button
        type="button"
        disabled={loadingButton}
        onClick={() =>
          !loadingButton && mutationMidtrans({ item, type: "items" })
        }
        className={`mt-3 w-full inline-flex justify-center rounded-md border ${
          loadingButton
            ? "bg-gray-600 hover:bg-gray-700border-gray-300 cursor-not-allowed"
            : "border-blue-300 bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }  shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:text-sm`}
      >
        {isLoading || loadingButton ? (
          <Spinner color="gray" aria-label="Purple spinner example" />
        ) : (
          "Use Midtrans"
        )}
      </button>
    </div>
  );
};

export default WithMidtrans;
