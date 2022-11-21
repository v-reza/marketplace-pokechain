/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { useMutation, useQueryClient } from "react-query";
import { convertBalanceToToken, verifyPassword } from "../schema/mutation";
import { useAxios } from "@/utils/axiosInstance";
import { Spinner } from "flowbite-react";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import bgToken from "@/dist/token.png";
import { useDispatch } from "react-redux";
import { updateJwtToken } from "@/contexts/AuthActions";
import { setNotification } from "@/redux/action/notificationActions";
import Image from "next/image";
import { getPriceToToken } from "@/utils/constant";
const rateToken = 0.028888;
export default function ConvertBalanceToToken({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  const [inputBalance, setInputBalance] = useState("");
  const [isErrorBalance, setIsErrorBalance] = useState(false);
  const [errorBalanceMessage, setErrorBalanceMessage] = useState("");

  const axiosInstance = useAxios();
  const { currentUser } = useUser();
  const { dispatch } = useAuth();
  const dispatchRedux = useDispatch();
  const queryClient = useQueryClient()

  const { mutate: mutationPassword, isLoading } = useMutation({
    mutationFn: (data) => verifyPassword(axiosInstance, data),
    onSuccess: () => {
      setIsCorrectPassword(true);
      setIsErrorPassword(false);
    },
    onError: (error) => {
      if (error.response.status === 400) {
        setIsErrorPassword(true);
      }
    },
  });

  const { mutate: mutationConvertBalanceToToken, isLoading: isLoadingConvert } =
    useMutation({
      mutationFn: (data) => convertBalanceToToken(axiosInstance, data),
      onSuccess: (data) => {
        setOpen(false);
        updateJwtToken({ dispatch, dispatchRedux }, data.accessToken, axiosInstance);
        setNotification(dispatchRedux, { message: data.msg, error: false });
        setIsCorrectPassword(false);
        setIsErrorBalance(false);
        setIsErrorPassword(false);
        setInputPassword("");
        setInputBalance("");
        queryClient.invalidateQueries("activityToken")
      },
      onError: (error) => {
        setNotification(dispatchRedux, {
          message: error.response.data.msg,
          error: true,
        });
      },
    });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {!isCorrectPassword ? (
                <>
                  <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                      <InformationCircleIcon
                        className="h-6 w-6 text-amber-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Please input your password to convert your balance to
                        token
                      </Dialog.Title>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm text-left font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={inputPassword}
                            onChange={(e) => {
                              setInputPassword(e.target.value);
                              setIsErrorPassword(false);
                            }}
                            className={`block w-full pr-10 ${
                              isErrorPassword
                                ? "border-red-300 text-red-900 placeholder-red-300  focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 text-gray-900 placeholder-gray-300  focus:ring-gray-500 focus:border-gray-500"
                            } focus:outline-none sm:text-sm rounded-md`}
                            placeholder="Password"
                            aria-invalid="true"
                            aria-describedby="password-error"
                          />
                          {isErrorPassword && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                        {isErrorPassword && (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            Your password is incorrect
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                    <div>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          mutationPassword({ password: inputPassword });
                        }}
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                          isLoading
                            ? "bg-gray-600 hover:bg-indigo-700 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                        } text-base font-medium text-white  focus:outline-nonesm:col-start-2 sm:text-sm`}
                      >
                        {isLoading ? (
                          <Spinner
                            color="gray"
                            aria-label="Purple spinner example"
                          />
                        ) : (
                          "Next"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100">
                      <InformationCircleIcon
                        className="h-6 w-6 text-amber-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Please input balance to convert to token
                      </Dialog.Title>
                      <div className="mt-4">
                        <label
                          htmlFor="price"
                          className="block text-sm text-left font-medium text-gray-700"
                        >
                          Balance
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            value={inputBalance}
                            onChange={(e) => {
                              setInputBalance(e.target.value);
                            }}
                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0.00"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="currency" className="sr-only">
                              Currency
                            </label>
                            <select
                              id="currency"
                              name="currency"
                              className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option>USD</option>
                            </select>
                          </div>
                        </div>
                        {isErrorBalance && (
                          <p className="text-rose-500 text-xs flex">
                            {errorBalanceMessage}
                          </p>
                        )}
                        <div className="flex flex-col w-full space-y-2">
                          <span className="text-white text-md font-medium">
                            Information
                          </span>
                          <span className="text-sm font-medium text-indigo-500">
                            Rate token today: {rateToken}
                          </span>
                          <div className="flex flex-col border-t">
                            <span className="text-sm font-medium text-white">
                              Total earn
                            </span>
                            <div className="flex items-center space-x-2">
                              <Image
                                src={bgToken}
                                alt="token"
                                width={30}
                                height={30}
                              />
                              <span className="capitalize text-sm font-bold text-slate-600 ">
                                {parseFloat(inputBalance * rateToken).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                    <div>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          if (inputBalance === "") {
                            setIsErrorBalance(true);
                            setErrorBalanceMessage("Please input balance");
                          } else if (inputBalance < 10) {
                            setIsErrorBalance(true);
                            setErrorBalanceMessage("Minimum balance is 10 USD");
                          } else if (
                            inputBalance > currentUser?.profile.balance
                          ) {
                            setIsErrorBalance(true);
                            setErrorBalanceMessage(
                              "Your balance is not enough"
                            );
                          } else if (inputBalance > 100000) {
                            setIsErrorBalance(true);
                            setErrorBalanceMessage(
                              "Maximum balance is 100000 USD"
                            );
                          } else {
                            mutationConvertBalanceToToken({
                              balance: inputBalance,
                              rateToken: rateToken,
                            });
                          }
                        }}
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                          isLoadingConvert
                            ? "bg-gray-600 hover:bg-indigo-700 cursor-not-allowed"
                            : "bg-amber-600 hover:bg-amber-700 cursor-pointer"
                        } text-base font-medium text-white  focus:outline-nonesm:col-start-2 sm:text-sm`}
                      >
                        {isLoadingConvert ? (
                          <Spinner
                            color="gray"
                            aria-label="Purple spinner example"
                          />
                        ) : (
                          "Convert"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
