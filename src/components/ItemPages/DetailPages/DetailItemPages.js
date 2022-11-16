import { useRouter } from "next/router";
import React from "react";
import bgToken from "@/dist/token.png";
import logoBuy from "@/dist/logo-buy.png";
import Image from "next/image";
import { getPriceToToken } from "@/utils/constant";
import { Tooltip } from "flowbite-react";
import { getItemType } from "constant-pokechain";

const DetailItemPages = ({ item, isAuth }) => {
  console.log(isAuth);
  return (
    <div>
      <div className="relative py-7 px-8 lg:px-32">
        <div className="w-full h-screen max-w-7xl">
          <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-white capitalize">
                {item.name.replace("-", " ")}
              </h2>
              <span className="text-lg font-medium text-white">
                #{item.increment_id}
              </span>
            </div>
            <div className="flex flex-row items-center justify-between space-x-6">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Image src={bgToken} width={30} height={30} alt="token" />
                  <span className="text-white font-bold text-md">
                    {getPriceToToken(item.price)}
                  </span>
                </div>
                <span className="text-slate-400 font-medium text-md">
                  ${item.price}
                </span>
              </div>
              {!isAuth ? (
                <Tooltip
                  placement="top"
                  content={
                    <span className="text-white text-sm font-bold">
                      Please login to buy this item
                    </span>
                  }
                >
                  <div className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-800/50 cursor-not-allowed">
                    <div className="flex items-center space-x-2">
                      <Image src={logoBuy} width={18} height={20} alt="logo" />
                      <span className="text-slate-600 text-sm font-bold">
                        Buy now
                      </span>
                    </div>
                  </div>
                </Tooltip>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Image src={logoBuy} width={18} height={20} alt="logo" />
                    <span className="text-white text-sm font-bold">
                      Buy now
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="pt-32">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <Image
                  src={getItemType(item.name).img}
                  alt="item"
                  width={500}
                  height={500}
                  blurDataURL
                  placeholder="blur"
                />
              </div>
              <div className="sm:col-span-2 sm:pl-64">
                <div className="flex flex-col space-y-4">
                  <h3 className="text-lg text-white font-bold">About</h3>
                  <div className="bg-gray-800 rounded-md border border-gray-700 h-56">
                    <div className="py-6 px-8 block">
                      <div>
                        <span className="uppercase text-slate-400 text-sm font-bold">
                          Rarity
                        </span>
                        <div
                          className={`flex items-center mt-2  bg-slate-700 rounded-md px-2 w-max py-1 space-x-1`}
                        >
                          <div className="text-sm font-extrabold text-white ">
                            <Tooltip
                              placement="top"
                              content={
                                <span className="capitalize">
                                  {getItemType(item.name).detail.rarity.name}
                                </span>
                              }
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                style={{
                                  color: getItemType(item.name).detail.rarity
                                    .hex,
                                }}
                              >
                                <path
                                  d="M9.5 9.5S11 2 12 2s2.5 7.5 2.5 7.5S21 11 21 12s-6.5 2.5-6.5 2.5S13 22 12 22s-2.5-7.5-2.5-7.5S3 13 3 12s6.5-2.5 6.5-2.5Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </Tooltip>
                          </div>

                          <div
                            className={`flex items-center  text-sm font-extrabold `}
                            style={{
                              color: getItemType(item.name).detail.rarity.hex,
                            }}
                          >
                            {getItemType(item.name).detail.rarity.name}
                          </div>
                        </div>
                      </div>
                      <div className="pt-6">
                        <span className="uppercase text-slate-400 text-sm font-bold">
                          Rarity
                        </span>
                        <div
                          className={`flex items-center mt-2   rounded-md px-2 w-max py-1 space-x-1`}
                        >
                          <div
                            className={`flex items-center  text-sm font-extrabold text-white`}
                          >
                            {getItemType(item.name).detail.rarity.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItemPages;
