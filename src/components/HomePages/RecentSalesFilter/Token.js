import { getPriceToToken, getTokenType } from "@/utils/constant";
import Image from "next/image";
import React from "react";

const Token = ({ item }) => {
  return (
    <div>
      <div
        className={`h-56 w-72 bg-opacity-25 rounded-t-lg shadow-lg `}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
            getTokenType().rgba
          })`,
        }}
      >
        <div className="flex items-center w-full">
          <div className="px-4 flex items-start justify-start py-2 ">
            <div className="flex flex-col">
              <div
                className={`flex items-center  bg-slate-800 rounded-md px-2 w-max py-1 space-x-1`}
              >
                <div
                  className={`flex items-center  text-sm font-extrabold`}
                  style={{
                    color: getTokenType().hex,
                  }}
                >
                  #{item.increment_id}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              alt={item.token}
              src={getTokenType().img}
              width={100}
              height={100}
              blurDataURL
              placeholder="blur"
              priority
            />
            <div className="mt-2 flex items-center space-x-2">
              <span className="capitalize text-sm font-bold text-slate-300 ">
                Sell: {item.token}
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
                  Seller: {item.marketplace.seller.user.username}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
