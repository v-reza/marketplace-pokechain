import React, { useEffect, useRef } from "react";
import bgToken from "@/dist/token.png";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { getPokemonElementType, getPriceToToken } from "@/utils/constant";
import axios from "axios";
import { Tooltip } from "flowbite-react";
import { motion } from "framer-motion"
const RecentSales = () => {
  const itemTopSales = [
    {
      id: 1,
      name: "Pokemon",
      active: true,
    },
    {
      id: 2,
      name: "Items",
      active: false,
    },
    {
      id: 3,
      name: "Bundles",
      active: false,
    },
    {
      id: 4,
      name: "Token",
      active: false,
    },
  ];
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomOffset, setRandomOffset] = useState(
    Math.floor(Math.random() * 800)
  );
  const scrollRecentSales = useRef();
  const [btnScrollRecentSalesLeft, setBtnScrollRecentSalesLeft] =
    useState(false);
  const [btnScrollRecentSalesRight, setBtnScrollRecentSalesRight] =
    useState(true);

  const scroll = (scrollOfset, active) => {
    scrollRecentSales.current.scrollLeft += scrollOfset;
    const maxScrollRight = 300;
    const maxScrollLeft =
      scrollRecentSales.current.scrollWidth -
      scrollRecentSales.current.clientWidth -
      maxScrollRight;
    if (scrollRecentSales.current.scrollLeft >= maxScrollLeft) {
      setBtnScrollRecentSalesRight(false);
    }
    if (scrollRecentSales.current.scrollLeft <= maxScrollRight) {
      setBtnScrollRecentSalesLeft(false);
    }
    if (scrollRecentSales.current.scrollLeft < maxScrollLeft) {
      setBtnScrollRecentSalesRight(true);
    }
    if (scrollRecentSales.current.scrollLeft > maxScrollRight) {
      setBtnScrollRecentSalesLeft(true);
    }
    if (active === "activeLeft") {
      setBtnScrollRecentSalesLeft(true);
    } else if (active === "activeRight") {
      setBtnScrollRecentSalesRight(true);
    }
  };
  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}&limit=9`
        );
        if (res.data.results.length > 0) {
          await res.data.results.map(async (item) => {
            await axios
              .get(item.url)
              .then((res) =>
                setPokemon((prev) => [
                  ...prev.filter((item) => item.name !== res.data.name),
                  res.data,
                ])
              );
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getPokemon();
  }, []);
  return (
    <div>
      <div className="relative lg:px-12 pb-16 sm:pb-24 lg:pb-20">
        <div className="relative bg-gray-800 rounded-lg">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between text-left mx-auto max-w-md px-4 sm:max-w-4xl sm:px-6 lg:px-8 lg:max-w-full py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <div className="flex items-center justify-between">
                <div className="text-xl sm:text-2xl md:text-2xl font-extrabold text-white tracking-tight">
                  Recent sales
                </div>
              </div>
              <div
                className="space-x-2 flex items-center overflow-x-auto mt-1"
                id="scroll_item_topSales"
              >
                {itemTopSales.map((item) => (
                  <div
                    key={item.id}
                    className={`text-indigo-500 text-sm font-bold px-4 py-2 ${
                      item.active && "bg-gray-700"
                    } hover:bg-gray-700 rounded-md cursor-pointer`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 pb-16  max-w-md px-4 sm:max-w-4xl sm:px-6 lg:px-8 md:max-w-5xl lg:max-w-full relative">
            <div
              className="w-full space-x-4 pb-6 pt-4 flex items-center overflow-x-auto lg:overflow-x-hidden"
              id="scroll_item_topSales"
              ref={scrollRecentSales}
            >
              {btnScrollRecentSalesLeft && !loading && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 z-20 left-0 mx-auto cursor-pointer"
                  onClick={() => scroll(-300, "activeRight")}
                >
                  <div className="ml-4 mt-32 p-2 bg-gray-700 hover:bg-gray-600 rounded-md">
                    <ArrowLeftIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              {btnScrollRecentSalesRight && !loading && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 z-20 right-0 mx-auto cursor-pointer"
                  onClick={() => scroll(300, "activeLeft")}
                >
                  <div className="mr-4 mt-32 p-2 bg-gray-700 hover:bg-gray-600 rounded-md">
                    <ArrowRightIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              {!loading
                ? pokemon.map((item, index) => (
                    <div
                      className="flex flex-col items-start space-y-2"
                      key={index}
                    >
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-gray-700 border border-slate-600  hover:border-slate-500 cursor-pointer"
                      >
                        <div
                          className={`h-56 w-72 bg-opacity-25 rounded-t-lg shadow-lg `}
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
                              getPokemonElementType(item.types[0].type.name)
                                .rgba
                            })`,
                          }}
                        >
                          <div className="flex items-center w-full">
                            <div className="px-4 flex items-start justify-start py-2 ">
                              <div className="flex flex-col">
                                <div
                                  className={`flex items-center  bg-slate-800 rounded-md px-2 w-max py-1 space-x-1`}
                                >
                                  {item.types.map((element, index) => {
                                    const elementImage = getPokemonElementType(
                                      element.type.name
                                    );
                                    return (
                                      <div
                                        key={index}
                                        className="text-sm font-extrabold text-white "
                                      >
                                        <Tooltip
                                          placement="top"
                                          content={
                                            <span className="capitalize">
                                              {element.type.name}
                                            </span>
                                          }
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
                                      item.types.length > 0 &&
                                      "text-transparent bg-clip-text"
                                    }`}
                                    style={
                                      item.types.length === 1
                                        ? {
                                            color: getPokemonElementType(
                                              item.types[0].type.name
                                            ).hex,
                                          }
                                        : {
                                            backgroundImage: `linear-gradient(to right, ${
                                              getPokemonElementType(
                                                item.types[0].type.name
                                              ).hex
                                            }, ${
                                              getPokemonElementType(
                                                item.types[1].type.name
                                              ).hex
                                            })`,
                                          }
                                    }
                                  >
                                    #{Math.floor(Math.random() * 900000)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center justify-center">
                              <Image
                                alt="pokemon"
                                src={item.sprites.other.home.front_default}
                                width={100}
                                height={100}
                                blurDataURL
                                placeholder="blur"
                                priority
                              />
                              <div className="mt-2 flex items-center space-x-2">
                                <Image
                                  alt="token"
                                  src={bgToken}
                                  width={30}
                                  height={30}
                                />
                                <span className="capitalize text-sm font-bold text-slate-300 ">
                                  {getPriceToToken(
                                    Math.floor(Math.random() * 500)
                                  )}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="capitalize text-sm font-bold text-slate-300">
                                ${Math.floor(Math.random() * 500)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded-b-lg p-6 flex flex-col justify-between">
                          <div className="flex-1">
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center space-x-1 ">
                                  <span className="text-md font-medium text-white">
                                    Pokemon
                                  </span>
                                  <span className="text-md font-medium text-white">
                                    #{Math.floor(Math.random() * 900000)}
                                  </span>
                                </div>
                                <span className=" mt-1 text-xs font-bold text-slate-400">
                                  Sold out by Shadow
                                </span>
                              </div>
                              <Tooltip
                                placement="top"
                                content={
                                  <div className="w-72 h-40 ">
                                    <div className="px-4">
                                      <div className="flex flex-col">
                                        <span className="text-md font-bold text-slate-300 capitalize">
                                          Pokemon Name : {item.name}
                                        </span>
                                        <div className="mt-2 flex flex-col">
                                          <span className="text-md font-bold text-slate-300 capitalize">
                                            Stats
                                          </span>
                                          <span className="text-md font-bold text-slate-300 capitalize">
                                            Element :{" "}
                                            {item.types
                                              .map((el, index) => (
                                                <span key={index}>
                                                  {el.type.name}{" "}
                                                </span>
                                              ))
                                              .reduce((prev, curr) => [
                                                prev,
                                                ", ",
                                                curr,
                                              ])}
                                          </span>
                                          <span className="text-md font-bold text-slate-300 capitalize">
                                            Health : {item.stats[0].base_stat}
                                          </span>
                                          <span className="text-md font-bold text-slate-300 capitalize">
                                            Attack : {item.stats[1].base_stat}
                                          </span>
                                          <span className="text-md font-bold text-slate-300 capitalize">
                                            Defense : {item.stats[2].base_stat}
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
                      </motion.div>
                      <span className="px-2 text-slate-400 text-xs font-extrabold">
                        {Math.floor(Math.random() * 60) + " "}minute ago
                      </span>
                    </div>
                  ))
                : new Array(9).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="h-56 w-56 animate-pulse bg-gray-700 rounded-lg" />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;
