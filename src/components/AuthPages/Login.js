/* eslint-disable @next/next/no-img-element */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function LoginModal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [form, setForm] = useState({
    usernameORemail: "",
    password: "",
  });

  const handleSubmit = () => {};

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
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
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
            <div
              className="inline-block align-middle bg-gray-900 rounded-2xl sm:rounded-[2rem] px-16 pt-5 pb-4 text-left overflow-hidden shadow-3xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg md:max-w-3xl lg:max-w-4xl sm:w-full sm:p-6"
              style={{
                backgroundImage:
                  "url('/assets/images/light-green.png'), url('/assets/images/light-blue.png')",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "saturation",
                opacity: "80",
              }}
            >
              <div className="sm:block absolute top-0 right-0 pt-4 pr-4 mt-2">
                <button
                  type="button"
                  className="bg-transparent rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="md:grid md:grid-cols-2">
                <div className="hidden md:block">
                  <img
                    className="absolute inset-0 h-full w-96 object-cover"
                    src="/assets/images/bg-pokemon.png"
                    alt=""
                  />
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-lg">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-xl font-extrabold text-white">
                      Sign in to your account
                    </h2>
                  </div>
                  <div className="bg-transparent py-8 px-2  rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-300"
                        >
                          Username or Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            required
                            value={form.usernameORemail}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                usernameORemail: e.target.value,
                              })
                            }
                            className="appearance-none block w-full px-3 py-1 sm:py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-slate-300"
                        >
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={form.password}
                            onChange={(e) =>
                              setForm({ ...form, password: e.target.value })
                            }
                            className="appearance-none block w-full px-3 py-1 sm:py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between ">
                        <div className="text-xs sm:text-sm">
                          <Link href={"/auth/register"}>
                            <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                              {"Don't Have Account?"}
                            </div>
                          </Link>
                        </div>
                        <div className="text-xs sm:text-sm">
                          <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot Password?
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-[#3D00B7] hover:bg-[#3d00b7a1] focus:outline-none"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>

                    <div className="mt-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-gray-900 text-slate-300">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3">
                        <button
                          type="button"
                          class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                        >
                          <svg
                            class="mr-2 -ml-1 w-4 h-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                          >
                            <path
                              fill="currentColor"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                          </svg>
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
