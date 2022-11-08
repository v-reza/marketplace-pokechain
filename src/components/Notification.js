/* This example requires Tailwind CSS v2.0+ */
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { Toast } from "flowbite-react";
import useNotification from "@/hooks/useNotification";
import { useEffect } from "react";
import { resetNotification } from "@/redux/action/notificationActions";
import { useDispatch } from "react-redux";

export default function Notification() {
  const { isNotification, isSuccess, message } = useNotification();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isNotification) {
      setTimeout(() => {
        resetNotification(dispatch);
      }, 2000);
    }
  }, [isNotification]);

  return (
    <>
      <div
        className={`z-50 ${
          isNotification ? "fixed" : "hidden"
        } right-4 top-4 margin-0  rounded-lg shadow-xl bg-gray-800`}
      >
        <Toast style={{ backgroundColor: "rgb(31 41 55)" }}>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-transparent">
            {isSuccess ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex flex-col ">
            <div
              className={`ml-3 text-sm font-bold ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {isSuccess ? "Success" : "Error"}
            </div>
            <div className="ml-3 text-sm font-normal text-gray-400/80">
              {message}
            </div>
          </div>
          <div id="toogle_toast">
            <Toast.Toggle />
          </div>
        </Toast>
      </div>
    </>
  );
}
