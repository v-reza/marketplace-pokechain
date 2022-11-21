import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getItemType } from "constant-pokechain";
import { useQuery } from "react-query";
import { useAxios } from "@/utils/axiosInstance";
import { getBackpackItems } from "../schema/query";
import SkeletonCard from "../../SkeletonCard";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import DetailListItems from "./DetailListItems";

const ListItems = ({ TabsComponent }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [openDetail, setOpenDetail] = useState(false);
  const [openDetailMobile, setOpenDetailMobile] = useState(false);
  const [detailItems, setDetailItems] = useState(null);

  const detailRef = useRef();
  const axiosInstance = useAxios();
  const {
    data: listItems,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: "listItems",
    queryFn: () => getBackpackItems(axiosInstance),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setOpenDetailMobile(false);
    }
  }, [isMobile]);

  return (
    <>
      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <h1 className="flex-1 text-2xl font-bold text-white">Backpack</h1>
            </div>

            {/* Tabs */}
            {TabsComponent}

            <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
              <ul
                role="list"
                className={`${
                  !openDetailMobile &&
                  "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                }`}
              >
                {!isLoading ? (
                  !openDetailMobile ? (
                    listItems?.my_items.map((item) => (
                      <li
                        key={item.id}
                        className="relative"
                        onClick={() => {
                          setOpenDetail(true);
                          isMobile && setOpenDetailMobile(true);
                          setDetailItems(item);
                          !isMobile &&
                            detailRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }}
                      >
                        <div className="flex flex-col items-start space-y-2">
                          <div className="shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-gray-700 border border-slate-600  hover:border-slate-500 cursor-pointer">
                            <div
                              className={`h-56 w-full bg-opacity-25 rounded-t-lg shadow-lg `}
                              style={{
                                backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
                                  getItemType(item.name).rgba
                                })`,
                              }}
                            >
                              <div className="flex items-center w-full">
                                <div className="px-4 flex items-start justify-start py-2 ">
                                  <div className="flex flex-col">
                                    <div
                                      className={`flex items-center  bg-slate-800 rounded-md px-2 w-max py-1 space-x-1`}
                                    >
                                      <div className="text-sm font-extrabold text-white ">
                                        <Tooltip
                                          placement="top"
                                          content={
                                            <span className="capitalize">
                                              {
                                                getItemType(item.name).detail
                                                  .rarity.name
                                              }
                                            </span>
                                          }
                                        >
                                          <svg
                                            viewBox="0 0 24 24"
                                            width="16"
                                            height="16"
                                            style={{
                                              color: getItemType(item.name)
                                                .detail.rarity.hex,
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
                                        className={`flex items-center  text-sm font-extrabold !ml-2 `}
                                        style={{
                                          color: getItemType(item.name).detail
                                            .rarity.hex,
                                        }}
                                      >
                                        {
                                          getItemType(item.name).detail.rarity
                                            .name
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col items-center justify-center">
                                  <Image
                                    alt="item"
                                    src={getItemType(item.name).img}
                                    width={100}
                                    height={100}
                                    blurDataURL
                                    placeholder="blur"
                                    priority
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 bg-gray-700 rounded-b-lg p-6 flex flex-col justify-between">
                              <div className="flex-1">
                                <div className="flex flex-row justify-between">
                                  <span className="text-md font-medium text-white capitalize">
                                    {item.name.replace("-", " ")}
                                  </span>
                                  <span className="text-sm sm:text-md font-medium text-white">
                                    Qty: {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <DetailListItems
                      open={openDetailMobile}
                      setOpen={setOpenDetailMobile}
                      detailItems={detailItems}
                      detailRef={detailRef}
                    />
                  )
                ) : (
                  <SkeletonCard length={20} width="w-full" />
                )}
              </ul>
            </section>
          </div>
        </main>

        {/* Details sidebar */}
        {openDetail && !isMobile && (
          <>
            <div className="hidden lg:block">
              <DetailListItems
                open={!isMobile && openDetail}
                setOpen={!isMobile && setOpenDetail}
                detailItems={detailItems}
                detailRef={detailRef}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListItems;
