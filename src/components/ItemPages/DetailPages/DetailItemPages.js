import { useRouter } from "next/router";
import React, { useState } from "react";
import bgToken from "@/dist/token.png";
import logoBuy from "@/dist/logo-buy.png";
import Image from "next/image";
import { getPriceToToken } from "@/utils/constant";
import { Tooltip } from "flowbite-react";
import { getItemType } from "constant-pokechain";
import ModalPayment from "./Payment/ModalPayment";
import useUser from "@/hooks/useUser";

const DetailItemPages = ({ item, isAuth }) => {
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const { currentUser } = useUser();
  return (
    <div>
      <ModalPayment
        open={openModalPayment}
        setOpen={setOpenModalPayment}
        item={item}
      />
      <div className="relative pt-7 px-8 lg:px-32">
        <div className="w-full h-full max-w-7xl">
          <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-white capitalize">
                {item.name.replace("-", " ")}
              </h2>
              <span className="text-lg font-medium text-white">
                #{item.increment_id}
              </span>
            </div>
            <div className="flex flex-row items-center justify-between space-x-12">
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
              {!item.buyer_id &&
                (!isAuth ||
                item.marketplace.seller.user_id === currentUser?.userId ? (
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
                        <Image
                          src={logoBuy}
                          width={18}
                          height={20}
                          alt="logo"
                        />
                        <span className="text-slate-600 text-sm font-bold">
                          Buy now
                        </span>
                      </div>
                    </div>
                  </Tooltip>
                ) : (
                  <div
                    className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
                    onClick={() => setOpenModalPayment(true)}
                  >
                    <div className="flex items-center space-x-2">
                      <Image src={logoBuy} width={18} height={20} alt="logo" />
                      <span className="text-white text-sm font-bold">
                        Buy now
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <Image
                  src={getItemType(item.name).img}
                  alt="item"
                  width={500}
                  height={500}
                  blurDataURL
                  placeholder="blur"
                />
              </div>
              <div className="lg:col-span-2 lg:pl-64">
                <div className="flex flex-col space-y-20">
                  <div>
                    <h3 className="text-lg text-white font-bold my-2">About</h3>
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
                        <div className="pt-6 flex flex-col">
                          <div>
                            <span className="uppercase text-slate-400 text-sm font-bold">
                              Owner
                            </span>

                            <div className={`flex items-center space-x-2`}>
                              <span className="text-sm font-extrabold text-white">
                                @{item.marketplace.seller.user.username}
                              </span>
                              <span className="truncate text-xs text-slate-600">
                                (pokechain:
                                {item.marketplace.seller.user.id.replaceAll(
                                  "-",
                                  ""
                                )}
                                )
                              </span>
                            </div>
                            {item.buyer_id && (
                              <div className="mt-1">
                                <span className="uppercase text-slate-400 text-sm font-bold">
                                  Buyer
                                </span>

                                <div className={`flex items-center space-x-2`}>
                                  <span className="text-sm font-extrabold text-white">
                                    @{item.buyer.user.username}
                                  </span>
                                  <span className="truncate text-xs text-slate-600">
                                    (pokechain:
                                    {item.buyer.user.id.replaceAll(
                                      "-",
                                      ""
                                    )}
                                    )
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-20">
                    <h3 className="text-lg text-white font-bold my-2">Effect</h3>
                    <div className="bg-gray-800 rounded-md border border-gray-700 h-max">
                      <div className="py-6 px-8 block">
                        <div>
                          {getItemType(item.name).detail.required.value ? (
                            <div>
                              <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                                {getItemType(
                                  item.name
                                ).detail.required.value?.map((list) => (
                                  <span
                                    className="text-md text-white font-medium"
                                    key={list.name}
                                  >
                                    Increase {list.name} {list.value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="text-md text-white font-medium">
                              This item has no effect.
                            </span>
                          )}
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
