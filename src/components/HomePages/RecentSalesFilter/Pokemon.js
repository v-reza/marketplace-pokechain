import { getPokemonElementType, getPriceToToken } from "@/utils/constant";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import React from "react";
import bgToken from "@/dist/token.png";

const Pokemon = ({ item }) => {
  return (
    <div>
      <div
        className={`h-56 w-72 bg-opacity-25 rounded-t-lg shadow-lg `}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
            getPokemonElementType(item.element.split(",")[0]).rgba
          })`,
        }}
      >
        <div className="flex items-center w-full">
          <div className="px-4 flex items-start justify-start py-2 ">
            <div className="flex flex-col">
              <div
                className={`flex items-center  bg-slate-800 rounded-md px-2 w-max py-1 space-x-1`}
              >
                {item.element.split(",").map((element, index) => {
                  const elementImage = getPokemonElementType(element);
                  return (
                    <div
                      key={index}
                      className="text-sm font-extrabold text-white "
                    >
                      <Tooltip
                        placement="top"
                        content={<span className="capitalize">{element}</span>}
                      >
                        <Image
                          alt={index}
                          src={elementImage.img}
                          width={20}
                          height={20}
                          style={{ marginTop: "1px" }}
                        />
                      </Tooltip>
                    </div>
                  );
                })}

                <div
                  className={`flex items-center -mt-1 text-md !ml-2 ${
                    item.element.split(",").length > 0 &&
                    "text-transparent bg-clip-text"
                  }`}
                  style={
                    item.element.split(",").length === 1
                      ? {
                          color: getPokemonElementType(
                            item.element.split(",")[0]
                          ).hex,
                        }
                      : {
                          backgroundImage: `linear-gradient(to right, ${
                            getPokemonElementType(item.element.split(",")[0])
                              .hex
                          }, ${
                            getPokemonElementType(item.element.split(",")[1])
                              .hex
                          })`,
                        }
                  }
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
              alt="pokemon"
              src={item.front_default}
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
                <span className="text-md font-medium text-white">Pokemon</span>
                <span className="text-md font-medium text-white">
                  #{item.increment_id}
                </span>
              </div>
              <span className=" mt-1 text-xs font-bold text-slate-400">
                {/* {item.buyer_id && getUser(item.buyer_id)} */}
                {item.buyer_id && "Sold out by " + item.buyer?.user.username}
              </span>
            </div>
            <Tooltip
              placement="top"
              content={
                <div className="w-72 h-40 ">
                  <div className="px-4">
                    <div className="flex flex-col">
                      <span className="text-md font-bold text-slate-300 capitalize">
                        Seller : {item.marketplace.seller.user.username}
                      </span>
                      <span className="text-md font-bold text-slate-300 capitalize">
                        Pokemon Name : {item.name}
                      </span>
                      <div className="mt-2 flex flex-col">
                        <span className="text-md font-bold text-slate-300 capitalize">
                          Stats
                        </span>
                        <span className="text-md font-bold text-slate-300 capitalize">
                          Element :{" "}
                          {item.element
                            .split(",")
                            .map((el, index) => <span key={index}>{el} </span>)
                            .reduce((prev, curr) => [prev, ", ", curr])}
                        </span>
                        <span className="text-md font-bold text-slate-300 capitalize">
                          Health : {item.health}
                        </span>
                        <span className="text-md font-bold text-slate-300 capitalize">
                          Attack : {item.attack}
                        </span>
                        <span className="text-md font-bold text-slate-300 capitalize">
                          Defense : {item.defense}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="text-slate-400 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.922 2.571a4.067 4.067 0 0 1 4.156 0l4.844 2.868C20.208 6.201 21 7.61 21 9.132v5.736c0 1.523-.792 2.931-2.078 3.693l-4.844 2.868a4.067 4.067 0 0 1-4.156 0L5.078 18.56C3.792 17.799 3 16.39 3 14.868V9.132c0-1.523.792-2.931 2.078-3.693l4.844-2.868ZM13 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 2.25a.75.75 0 0 0 0 1.5h.25V17a.75.75 0 0 0 1.5 0v-7a.75.75 0 0 0-.75-.75h-1Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
