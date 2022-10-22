/* eslint-disable @next/next/no-img-element */
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { AdjustmentsIcon, FilterIcon } from "@heroicons/react/outline";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <div
        className="bg-gray-900"
        style={{
          backgroundImage:
            "url('/assets/images/light-green.png'), url('/assets/images/light-blue.png')",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "saturation",
          opacity: "40",
          backgroundSize: "100% 100%",
        }}
      >
        <Head>
          <title>Pokechain | Marketplace</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="relative overflow-hidden">
          <main>
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
        </div>
      </div>
    </>
  );
}
