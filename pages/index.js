/* eslint-disable @next/next/no-img-element */
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  AdjustmentsIcon,
  FilterIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { navigation, features, footerNavigation } from "@/utils/navigation";
import { classNames } from "@/utils/constant";
import Head from "next/head";
import LoginModal from "@/components/AuthPages/Login";
import Link from "next/link";

const people = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const router = useRouter()

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div
        className="bg-gray-900"
        style={{
          backgroundImage:
            "url('/assets/images/light-green.png'), url('/assets/images/light-blue.png')",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "color",
          opacity: "80",
        }}
      >
        <Head>
          <title>Pokechain</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="relative overflow-hidden">
          <Popover as="header" className="relative">
            <div className=" pt-6 pb-4">
              <nav
                className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                aria-label="Global"
              >
                <div className="flex items-center flex-1">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="/assets/images/icons.png"
                        alt=""
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <button
                        type="button"
                        className="ml-auto mr-4 inline-flex items-center justify-center hover:text-slate-600 lg:hidden text-slate-400"
                      >
                        <span className="sr-only">Search</span>
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m19 19-3.5-3.5"></path>
                          <circle cx="11" cy="11" r="6"></circle>
                        </svg>
                      </button>
                      <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="hidden space-x-8 md:flex md:ml-10">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <div
                          key={item.name}
                          className="cursor-pointer text-base  text-white hover:text-gray-300"
                        >
                          <span className={`${router.pathname === item.href ? "text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600" : "font-medium"}`}>

                          {item.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-12">
                  <Combobox
                    as="div"
                    value={selectedPerson}
                    onChange={setSelectedPerson}
                  >
                    <div className="relative mt-1">
                      <Combobox.Input
                        className="w-full lg:w-[28rem] xl:w-[40rem] rounded-full  border border-indigo-500 bg-transparent text-white py-2 pl-6 pr-12 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person) => person?.name}
                        placeholder="Search items, collections and accounts"
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-4 focus:outline-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Combobox.Button>

                      {filteredPeople.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredPeople.map((person) => (
                            <Combobox.Option
                              key={person.id}
                              value={person}
                              className={({ active }) =>
                                classNames(
                                  "relative cursor-default select-none py-2 pl-3 pr-9",
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900"
                                )
                              }
                            >
                              {({ active, selected }) => (
                                <>
                                  <div className="flex items-center">
                                    <img
                                      src={person.imageUrl}
                                      alt=""
                                      className="h-6 w-6 flex-shrink-0 rounded-full"
                                    />
                                    <span
                                      className={classNames(
                                        "ml-3 truncate",
                                        selected && "font-semibold"
                                      )}
                                    >
                                      {person.name}
                                    </span>
                                  </div>

                                  {selected && (
                                    <span
                                      className={classNames(
                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                        active
                                          ? "text-white"
                                          : "text-indigo-600"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                  <div
                    onClick={() => setOpenAuthModal(true)}
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-[#3D00B7] hover:bg-[#3d00b7a1]"
                  >
                    Sign in Account
                  </div>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="/assets/images/icons.png"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:rounded-none">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="pt-5 pb-6">
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <div
                            key={item.name}
                            className="cursor-pointer block px-3 py-2 rounded-md text-base text-gray-900 hover:bg-gray-50"
                          >
                            <span className={`font-medium`}>{item.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 px-5">
                      <Link href="/auth/login">
                        <div className="cursor-pointer block text-center w-full py-3 px-4 rounded-lg shadow bg-[#3D00B7] hover:bg-[#3d00b7a1] text-white font-medium">
                          Sign in Account
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <main>
            <div className="overflow-hidden sm:pt-12 lg:relative lg:py-36 xl:py-40">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-1 lg:gap-24">
                <div className="mt-20 sm:mt-0">
                  <div className="sm:max-w-xl">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                      DISCOVER, AND COLLECT POKEMON NFTS
                    </h1>
                    <p className="mt-6 text-xl text-slate-300">
                      Digital Marketplace NFT Pokemon collections. Buy, sell,
                      battle, and discover exclusive digital assets
                    </p>
                  </div>
                  <div className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                    <div className="mt-4 sm:mt-0">
                      <button
                        type="submit"
                        className="block w-full rounded-full border border-transparent px-5 py-3 bg-[#3D00B7] hover:bg-[#3d00b7a1] text-base font-medium text-white shadow focus:outline-none  sm:px-10"
                      >
                        Explore Now
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="inline-flex items-center divide-x divide-gray-300">
                      <div className="flex-shrink-0 flex pr-5">
                        <StarIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                        <StarIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                        <StarIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                        <StarIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                        <StarIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3">
                        <span className="font-medium text-white">
                          Rated 5 stars
                        </span>{" "}
                        by over{" "}
                        <span className="font-medium text-rose-500">
                          500 beta users
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                <div className="py-12 px-4 pl-4 sm:pl-0 sm:px-0 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-20 lg:w-1/3">
                  <div
                    className="rounded-3xl bg-gradient-to-r from-[#73E0A9] to-[#5B68DF] "
                    style={{ padding: "1.3px" }}
                  >
                    <div className="px-8 py-5 sm:px-6 rounded-3xl shadow-md bg-gray-900">
                      <div
                        className="rounded-3xl shadow-md  bg-gradient-to-r from-[#73E0A9] to-[#5B68DF] "
                        style={{ padding: "1.3px" }}
                      >
                        <div className="px-8 py-8 sm:px-6 rounded-3xl shadow-md bg-gray-800 relative">
                          <div className="flex items-center justify-center">
                            <img
                              className="w-40 object-cover h-full -mt-10"
                              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
                              alt=""
                            />
                          </div>
                          <div className="w-full mt-3 flex items-center justify-center absolute">
                            <div
                              style={{ padding: "1.3px" }}
                              className="bg-gradient-to-r mr-12 from-[#73E0A9] to-[#5B68DF] rounded-full "
                            >
                              <img
                                className="w-10 h-10  rounded-full"
                                src="/assets/images/profile.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-7">
                        <div className="flex items-center justify-center">
                          <div className="flex-col">
                            <div className="flex items-center justify-center">
                              <span className="text-white text-lg font-medium">
                                ZombieClub Token
                              </span>
                              <img
                                src="/assets/images/verified-user.png"
                                className="w-5 h-5 ml-2"
                                alt=""
                              />
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-white text-md font-medium">
                                Created by
                              </span>
                              <div className="text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                                ZombieLab
                              </div>
                            </div>
                            <div className="mt-3">
                              <span className="text-white text-sm ">
                                Zombie Lab is a collection of 10,000 animated
                                NFTs. Each NFT is unique and resides on the
                                Ethereum blockchain. Your Zombie Lab Club NFT
                                will double as your club membership.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature section with grid */}
            <div className="relative bg-white py-16 sm:py-24 lg:py-32">
              <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  THE AMAZING POKEMON NFT
                </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                  Buy, sell, and trade your favorite Pokemon NFTs. All NFTs are
                </p>
                <div className="mt-12">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                      <div key={feature.name} className="pt-6">
                        <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                          <div className="-mt-6">
                            <div>
                              <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg">
                                <feature.icon
                                  className="h-6 w-6 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                              {feature.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hot Auctions */}
            <div className="relative  py-16 sm:py-24 lg:py-32">
              <div className="relative">
                <div className="cursor-pointer flex items-center justify-between text-left mx-auto max-w-md px-4 sm:max-w-4xl sm:px-6 lg:px-8 lg:max-w-7xl">
                  <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    Hot Auctions
                  </p>
                  <p className="flex items-center text-lg font-medium text-white tracking-tight">
                    View All <ArrowRightIcon className="ml-4 w-5 h-5" />
                  </p>
                </div>
                <div className="mt-12 mx-auto max-w-md px-4 grid gap-4 sm:max-w-4xl sm:px-6 lg:px-8 sm:grid-cols-2  md:max-w-5xl md:grid-cols-3 lg:grid-cols-4 lg:max-w-7xl">
                  {new Array(4).fill(0).map((_, i) => (
                    <div
                      className="rounded-3xl bg-gradient-to-r from-[#73E0A9] to-[#5B68DF] "
                      style={{ padding: "1.3px" }}
                      key={i}
                    >
                      <div className="px-8 py-5 sm:px-6 rounded-3xl shadow-md bg-gray-900">
                        <div
                          className="rounded-3xl shadow-md  bg-gradient-to-r from-[#73E0A9] to-[#5B68DF] "
                          style={{ padding: "1.3px" }}
                        >
                          <div className="px-8 py-8 sm:px-6 rounded-3xl shadow-md bg-gray-800 relative">
                            <div className="flex items-center justify-center">
                              <img
                                className="w-40 object-cover h-full -mt-10"
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
                                alt=""
                              />
                            </div>
                            <div className="w-full mt-3 flex items-center justify-center absolute">
                              <div
                                style={{ padding: "1.3px" }}
                                className="bg-gradient-to-r mr-12 from-[#73E0A9] to-[#5B68DF] rounded-full "
                              >
                                <img
                                  className="w-10 h-10  rounded-full"
                                  src="/assets/images/profile.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-7">
                          <div className="flex items-center justify-center">
                            <div className="flex-col w-full">
                              <div className="flex items-center justify-center">
                                <div className="text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                                  ZombieLab
                                </div>
                                <img
                                  src="/assets/images/verified-user.png"
                                  className="w-5 h-5 ml-2"
                                  alt=""
                                />
                              </div>
                              <div className="relative mt-2">
                                <div
                                  className="absolute inset-0 flex items-center"
                                  aria-hidden="true"
                                >
                                  <div className="w-full border-t border-[#5B68DF]" />
                                </div>
                              </div>
                              <div className="flex items-center justify-between space-x-2 w-full">
                                <span className="text-white text-md font-medium mt-2">
                                  Bulbasaur
                                </span>
                                <div className="mt-2 text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                                  $30
                                </div>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center justify-between">
                                  <p className="text-green-600 font-medium text-sm">
                                    Ends in 01.34.45
                                  </p>
                                  <div className="flex items-center justify-center space-x-2 cursor-pointer w-max rounded-full border border-transparent px-8  py-1 bg-gradient-to-r from-[#511d82] to-[#275a9c] text-base font-medium text-white shadow focus:outline-none  sm:px-10">
                                    Bid
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Discover NFTS */}
            <div className="relative  py-16 sm:py-24 lg:py-32">
              <div className="relative">
                <div className="flex flex-col lg:flex-row items-center justify-between text-left mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                  <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    Discover More Pokemon NFTS
                  </p>
                  <div className="flex items-center space-x-6 md:space-x-12 mt-8 lg:mt-0">
                    <div className="flex items-center space-x-2 text-white cursor-pointer">
                      <AdjustmentsIcon className="w-5 h-5" />
                      <span>Category</span>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 text-white cursor-pointer">
                      <span>Cheapest</span>
                      <ChevronDownIcon className="w-5 h-5" />
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 text-white cursor-pointer">
                      <span>Newest</span>
                      <ChevronDownIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer w-full rounded-full border border-transparent px-8  py-1 bg-gradient-to-r from-[#9B51E0] to-[#3081ED] text-base font-medium text-white shadow focus:outline-none  sm:px-10">
                      <FilterIcon className="w-5 h-5" />
                      <span className="">Filter</span>
                    </div>
                  </div>
                </div>
                <div className="mt-12 mx-auto max-w-md px-4 grid gap-4 sm:max-w-4xl sm:px-6 lg:px-8 sm:grid-cols-2  md:max-w-5xl md:grid-cols-3 lg:grid-cols-4 lg:max-w-7xl">
                  {new Array(8).fill(0).map((_, i) => (
                    <div
                      className="rounded-3xl bg-gradient-to-r from-[#73E0A9] to-[#5B68DF] "
                      style={{ padding: "1.3px" }}
                      key={i}
                    >
                      <div className="px-8 py-5 sm:px-6 rounded-3xl shadow-md bg-gray-900">
                        <div
                          className="rounded-3xl shadow-md  bg-gradient-to-r from-[#73E0A9] to-[#5B68DF] "
                          style={{ padding: "1.3px" }}
                        >
                          <div className="px-8 py-8 sm:px-6 rounded-3xl shadow-md bg-gray-800 relative">
                            <div className="flex items-center justify-center">
                              <img
                                className="w-40 object-cover h-full -mt-10"
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
                                alt=""
                              />
                            </div>
                            <div className="w-full mt-3 flex items-center justify-center absolute">
                              <div
                                style={{ padding: "1.3px" }}
                                className="bg-gradient-to-r mr-12 from-[#73E0A9] to-[#5B68DF] rounded-full "
                              >
                                <img
                                  className="w-10 h-10  rounded-full"
                                  src="/assets/images/profile.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-7">
                          <div className="flex items-center justify-center">
                            <div className="flex-col w-full">
                              <div className="flex items-center justify-center">
                                <div className="text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                                  ZombieLab
                                </div>
                                <img
                                  src="/assets/images/verified-user.png"
                                  className="w-5 h-5 ml-2"
                                  alt=""
                                />
                              </div>
                              <div className="relative mt-2">
                                <div
                                  className="absolute inset-0 flex items-center"
                                  aria-hidden="true"
                                >
                                  <div className="w-full border-t border-[#5B68DF]" />
                                </div>
                              </div>
                              <div className="flex items-center justify-between space-x-2 w-full">
                                <span className="text-white text-md font-medium mt-2">
                                  Bulbasaur
                                </span>
                                <div className="mt-2 text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                                  $30
                                </div>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center justify-center space-x-2 cursor-pointer w-full rounded-full border border-transparent px-8  py-1 bg-gradient-to-r from-[#511d82] to-[#275a9c] text-base font-medium text-white shadow focus:outline-none  sm:px-10">
                                  Buy now
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full mt-20 flex items-center justify-center">
                  <div
                    style={{ padding: "1.3px" }}
                    className="flex items-center justify-center space-x-2 cursor-pointer w-max rounded-full border border-transparent  bg-gradient-to-r from-[#511d82] to-[#275a9c] text-base font-medium text-white shadow focus:outline-none"
                  >
                    <div className="flex items-center justify-center space-x-2 cursor-pointer w-max rounded-full border border-transparent px-8  py-1 bg-gray-900 hover:bg-gray-800 text-base font-medium text-white shadow focus:outline-none  sm:px-10">
                      Load More
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="bg-gray-900" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
              Footer
            </h2>
            <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8">
              <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1">
                  <img
                    className="h-10"
                    src="/assets/images/icons.png"
                    alt="Company name"
                  />
                  <p className="text-gray-500 text-base">
                    Making the world NFT Game a better to free to play.
                  </p>
                  <div className="flex space-x-6">
                    {footerNavigation.social.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                      <div className="text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                        Marketplace
                      </div>
                      <ul role="list" className="mt-4 space-y-4">
                        {footerNavigation.marketplace.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-12 md:mt-0">
                      <div className="text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                        Stats
                      </div>
                      <ul role="list" className="mt-4 space-y-4">
                        {footerNavigation.stats.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                      <div className="text-transparent font-medium text-md bg-clip-text bg-gradient-to-r from-[#73E0A9] to-[#5B68DF]">
                        Resources
                      </div>
                      <ul role="list" className="mt-4 space-y-4">
                        {footerNavigation.resources.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 border-t border-gray-200 py-8">
                <p className="text-base text-white xl:text-center">
                  &copy; 2022 Pokechain, Inc. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <LoginModal setOpen={setOpenAuthModal} open={openAuthModal} />
    </>
  );
}
