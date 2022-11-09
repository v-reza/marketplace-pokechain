import { getItemType, getPriceToToken } from "@/utils/constant";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import React from "react";
import bgToken from "@/dist/token.png";

const Bundles = ({ item }) => {
  return (
    <div>
      <div className={`h-60 w-72  bg-black rounded-t-lg shadow-lg`}>
        <div className="flex flex-col">
          <div className="w-full h-40">
            <div className="ml-8 sm:ml-10 md:ml-12 lg:ml-10 flex items-start gridBundlesContainer">
              <div className="grid grid-cols-2 mt-4 md:gap-x-20 lg:gap-x-16  gap-y-4 gap-x-8 gridBundlesItems">
                {/* if more than 4 show length more */}
                {item.bundles_items.length > 4 ? (
                  <>
                    {item.bundles_items.slice(0, 3).map((type, index) => (
                      <div key={index}>
                        <Tooltip
                          placement="top"
                          content={
                            <span className="capitalize">
                              {getItemType(type.item_name).detail.name}
                            </span>
                          }
                        >
                          <Image
                            alt="item"
                            src={getItemType(type.item_name).img}
                            width={55}
                            height={55}
                            blurDataURL
                            placeholder="blur"
                            priority
                          />
                        </Tooltip>
                      </div>
                    ))}
                    <div className="flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        + {item.bundles_items.length - 3} more
                      </span>
                    </div>
                  </>
                ) : (
                  item.bundles_items.map((type, index) => (
                    <div key={index}>
                      <Tooltip
                        placement="top"
                        content={
                          <span className="capitalize">
                            {getItemType(type.item_name).detail.name}
                          </span>
                        }
                      >
                        <Image
                          alt="item"
                          src={getItemType(type.item_name).img}
                          width={55}
                          height={55}
                          blurDataURL
                          placeholder="blur"
                          priority
                        />
                      </Tooltip>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
              <Image alt="token" src={bgToken} width={30} height={30} />
              <span className="capitalize text-sm font-bold text-slate-300 ">
                {getPriceToToken(item.price)}
              </span>
            </div>
            <span className="capitalize text-sm font-bold text-slate-300">
              ${item.price}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-700 rounded-b-lg p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-md font-medium text-white capitalize">
                  Bundle
                </span>
                <span className="text-md font-medium text-white">
                  #{item.increment_id}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-bold text-slate-400">
                  {item.bundles_items.length} items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bundles;
