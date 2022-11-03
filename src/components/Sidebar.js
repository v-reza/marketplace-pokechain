/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt1Icon, ScaleIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Tooltip } from "flowbite-react";
import { classNames } from "@/utils/constant";
import { navigation } from "@/utils/navigation";
import LoginModal from "./AuthPages/Login";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SidebarMainContent = ({ children }) => {
  return <>{children}</>;
};

const Sidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [largeSidebarOpen, setLargeSidebarOpen] = useState(true);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const {currentUser} = useSelector(state=>state.user)
  const router = useRouter();

  return (
    <>
      <div className="h-screen min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs h-full w-full pt-5 pb-4 bg-gray-900">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4 space-x-4">
                  <img
                    className="h-8 w-auto"
                    src="/assets/images/icons.png"
                    alt="Pokechains logo"
                  />
                  <div className="text-transparent font-extrabold text-lg bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                    Pokechains
                  </div>
                </div>
                <nav
                  className="mt-5 flex-shrink-0 h-max overflow-y-auto "
                  aria-label="Sidebar"
                >
                  <div className="space-y-1">
                    <div>
                      <Link href={"/"}>
                        <div
                          className={`cursor-pointer group flex ${
                            router.pathname === "/"
                              ? "bg-[#3D00B7] hover:bg-[#3d00b7a1]"
                              : "hover:bg-[#3d00b7a1]"
                          } text-white items-center w-full px-8 mb-2  py-2 text-sm leading-6 font-medium rounded-md duration-150 space-x-4`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className={`${
                              router.pathname !== "/" ? "text-slate-400" : null
                            }`}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 1.25A3.75 3.75 0 0 0 8.25 5v1a4 4 0 0 0-3.862 3.263l-1.5 8A4 4 0 0 0 6.82 22h10.36a4 4 0 0 0 3.932-4.737l-1.5-8A4 4 0 0 0 15.75 6V5A3.75 3.75 0 0 0 12 1.25ZM14.25 6V5a2.25 2.25 0 0 0-4.5 0v1h4.5Z"
                              fill={`${
                                router.pathname === "/"
                                  ? "rgb(251 191 36)"
                                  : "currentColor"
                              }`}
                            ></path>
                          </svg>
                          <span
                            className={`ml-2 ${
                              router.pathname === "/"
                                ? "text-amber-500"
                                : "text-white"
                            } font-bold`}
                          >
                            Marketplace
                          </span>
                        </div>
                      </Link>
                      <span className="text-sm font-extrabold text-slate-400 px-8">
                        Collections
                      </span>
                    </div>
                    <div className="mt-4 pt-1 space-y-1">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <div
                            key={item.name}
                            className={classNames(
                              router.pathname === item.href
                                ? "bg-[#3D00B7] text-amber-500"
                                : "text-cyan-100 hover:text-white hover:bg-[#3d00b7a1]",
                              "cursor-pointer group flex items-center px-2  py-2 text-base font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <img
                              className={`${
                                item.customSize ? "w-8 h-8" : "h-5 w-8"
                              } ml-5 flex-shrink-0 mr-3`}
                              alt="icon"
                              src={item.icon}
                            />
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 pb-3 flex-shrink-0">
                    <div className="px-4 flex-shrink-0 w-full h-max">
                      <Link href="/auth/login">
                        <div
                          className="cursor-pointer flex items-center space-x-2 justify-center py-2 px-4 w-full rounded-full border border-transparent text-base font-medium text-white shadow focus:outline-none"
                          id="btn_login"
                        >
                          {/* <LoginIcon className="w-5 h-5" /> */}
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                              d="M6.75 3.25A4.75 4.75 0 0 0 2 8v8a4.75 4.75 0 0 0 4.75 4.75H14A4.75 4.75 0 0 0 18.75 16a.75.75 0 0 0-1.5 0A3.25 3.25 0 0 1 14 19.25H9.464A4.733 4.733 0 0 0 10.75 16V8c0-1.257-.488-2.4-1.286-3.25H14A3.25 3.25 0 0 1 17.25 8a.75.75 0 0 0 1.5 0A4.75 4.75 0 0 0 14 3.25H6.75Z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M15.53 9.47a.75.75 0 0 1 0 1.06l-.72.72h6.44a.75.75 0 0 1 0 1.5h-6.44l.72.72a.75.75 0 1 1-1.06 1.06l-1.293-1.293a1.75 1.75 0 0 1 0-2.474L14.47 9.47a.75.75 0 0 1 1.06 0Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <span className="font-medium">Log in</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div
          className={`hidden lg:flex ${
            largeSidebarOpen ? "lg:w-72" : "w-24"
          } lg:flex-col lg:fixed lg:inset-y-0 relative duration-150`}
        >
          <img
            src="/assets/images/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-cyan-700
           border-2 rounded-full  ${!largeSidebarOpen && "rotate-180"}`}
            onClick={() => setLargeSidebarOpen(!largeSidebarOpen)}
          />
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-gray-900 pt-8 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-8 space-x-6">
              <img
                className="h-8 w-auto"
                src="/assets/images/icons.png"
                alt="Pokechains logo"
              />
              {largeSidebarOpen && (
                <div className="text-transparent font-extrabold text-lg bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                  Pokechains
                </div>
              )}
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                <Link href="/">
                  <div
                    className={`cursor-pointer group flex ${
                      router.pathname === "/"
                        ? "bg-[#3D00B7] hover:bg-[#3d00b7a1]"
                        : "hover:bg-[#3d00b7a1]"
                    }  text-white items-center w-full px-8 mb-2 py-2 text-sm leading-6 font-medium rounded-md duration-150 space-x-4`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className={`${
                        router.pathname !== "/" ? "text-slate-400" : null
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 1.25A3.75 3.75 0 0 0 8.25 5v1a4 4 0 0 0-3.862 3.263l-1.5 8A4 4 0 0 0 6.82 22h10.36a4 4 0 0 0 3.932-4.737l-1.5-8A4 4 0 0 0 15.75 6V5A3.75 3.75 0 0 0 12 1.25ZM14.25 6V5a2.25 2.25 0 0 0-4.5 0v1h4.5Z"
                        fill={`${
                          router.pathname === "/"
                            ? "rgb(251 191 36)"
                            : "currentColor"
                        }`}
                      ></path>
                    </svg>
                    {largeSidebarOpen && (
                      <span
                        className={`ml-2 ${
                          router.pathname === "/"
                            ? "text-amber-500"
                            : "text-white"
                        } font-bold`}
                      >
                        Marketplace
                      </span>
                    )}
                  </div>
                </Link>
                {largeSidebarOpen && (
                  <span className="text-sm font-extrabold text-slate-400 px-8">
                    Collections
                  </span>
                )}

                <div className="mt-4 pt-1 space-y-2">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div
                        key={item.name}
                        className={classNames(
                          router.pathname === item.href
                            ? "bg-[#3D00B7] text-amber-500"
                            : "text-cyan-100 hover:text-white hover:bg-[#3d00b7a1]",
                          "cursor-pointer group flex items-center p-2 text-sm leading-6 font-medium rounded-md duration-150 space-x-4"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <Tooltip
                          key={item.name}
                          content={item.name}
                          placement="right"
                        >
                          <img
                            className={`${
                              item.customSize ? "w-8 h-8" : "h-5 w-8"
                            } ${
                              largeSidebarOpen ? "ml-5" : "ml-4"
                            } flex-shrink-0`}
                            alt="icon"
                            src={item.icon}
                          />
                        </Tooltip>
                        {largeSidebarOpen && (
                          <span className="mr-4 font-extrabold">
                            {item.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <div
            className="flex-shrink-0 flex pb-5 bg-gray-900"
            onClick={() => setOpenAuthModal(true)}
          >
            <div className="px-4 flex-shrink-0 w-full">
              <div
                className="cursor-pointer flex items-center space-x-2 justify-center py-2 px-4 w-full rounded-full border border-transparent  text-base font-medium text-white shadow focus:outline-none"
                id="btn_login"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M6.75 3.25A4.75 4.75 0 0 0 2 8v8a4.75 4.75 0 0 0 4.75 4.75H14A4.75 4.75 0 0 0 18.75 16a.75.75 0 0 0-1.5 0A3.25 3.25 0 0 1 14 19.25H9.464A4.733 4.733 0 0 0 10.75 16V8c0-1.257-.488-2.4-1.286-3.25H14A3.25 3.25 0 0 1 17.25 8a.75.75 0 0 0 1.5 0A4.75 4.75 0 0 0 14 3.25H6.75Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M15.53 9.47a.75.75 0 0 1 0 1.06l-.72.72h6.44a.75.75 0 0 1 0 1.5h-6.44l.72.72a.75.75 0 1 1-1.06 1.06l-1.293-1.293a1.75 1.75 0 0 1 0-2.474L14.47 9.47a.75.75 0 0 1 1.06 0Z"
                    fill="currentColor"
                  ></path>
                </svg>
                {largeSidebarOpen && (
                  <span className="font-medium">Log in</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            largeSidebarOpen ? "lg:pl-72" : "lg:pl-24"
          } flex flex-col flex-1 duration-150 bg-gray-900 min-h-full`}
        >
          <div className="relative z-10 flex-shrink-0 flex lg:hidden h-16  lg:border-none ">
            <button
              type="button"
              className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden border-b border-slate-600"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-end sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8 bg-gray-900 border-b border-slate-600">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>
                        Emilia Birch
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
      <LoginModal setOpen={setOpenAuthModal} open={openAuthModal} />
    </>
  );
};

Sidebar.MainContent = SidebarMainContent;

export default Sidebar;
