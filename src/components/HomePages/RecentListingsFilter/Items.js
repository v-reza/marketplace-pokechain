import { getPriceToToken } from "@/utils/constant";
import { getItemType, getPokemonElementType } from "constant-pokechain";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import React from "react";
import bgToken from "@/dist/token.png";

const Items = ({ item }) => {
  return (
    <div>
      <div
        className={`h-56 w-72 bg-opacity-25 rounded-t-lg shadow-lg `}
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
                        {getItemType(item.name).detail.rarity.name}
                      </span>
                    }
                  >
                    {getItemType(item.name).detail.rarity.svg}
                  </Tooltip>
                </div>
                <div
                  className={`flex items-center  text-sm font-extrabold !ml-2 `}
                  style={{
                    color: getItemType(item.name).detail.rarity.hex,
                  }}
                >
                  {getItemType(item.name).detail.rarity.name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              alt={item.name}
              src={getItemType(item.name).img}
              width={100}
              height={100}
              blurDataURL
              placeholder="blur"
              priority
            />
            <div className="mt-2 flex items-center space-x-2">
              <Image alt="token" src={bgToken} width={30} height={30} />
              <span className="capitalize text-sm font-bold text-slate-300 ">
                {getPriceToToken(item.price)}
              </span>
            </div>
          </div>
          <div>
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
              <div className="flex items-center space-x-1 ">
                <span className="text-md font-medium text-white capitalize">
                  {item.name.replace("-", " ")}
                </span>
                <span className="text-md font-medium text-white">
                  #{item.increment_id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
