import React, { useEffect } from "react";
import bgSalesStats from "@/dist/sales-stats.png";
import bgToken from "@/dist/token.png";
import bgPikachu from "@/dist/pikachu.png";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  classNames,
  getPokemonElementType,
  getPriceToToken,
} from "@/utils/constant";
import axios from "axios";
import { Tooltip } from "flowbite-react";

const TopSales = () => {
  const filterTime = [
    { id: 1, name: "24 hours", nameUpper: "24H", active: true },
    { id: 2, name: "7 days", nameUpper: "7D", active: false },
    { id: 3, name: "30 days", nameUpper: "30D", active: false },
  ];
  const itemTopSales = [
    {
      id: 1,
      name: "All",
      active: true,
    },
    {
      id: 2,
      name: "Pokemon",
      active: false,
    },
    {
      id: 3,
      name: "Items",
      active: false,
    },
    {
      id: 4,
      name: "Bundles",
      active: false,
    },
    {
      id: 5,
      name: "Token",
      active: false,
    },
  ];
  const [selected, setSelected] = useState(filterTime[0]);
  const [pokemon, setPokemon] = useState([]);
  const [randomOffset, setRandomOffset] = useState(
    Math.floor(Math.random() * 800)
  );
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
                  Top Sales
                </div>
                <div className="block md:hidden">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <div className="mt-1 relative">
                          <Listbox.Button className="bg-black text-white relative w-full border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none  sm:text-sm">
                            <span className="block truncate">
                              {selected.name}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {filterTime.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-indigo-600"
                                        : "text-white",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={person}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "block truncate"
                                        )}
                                      >
                                        {person.name}
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
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
            <div className="hidden md:flex mt-2 xl:mt-0">
              <div className="space-x-2 flex items-center">
                {filterTime.map((item) => (
                  <div
                    key={item.id}
                    className={`text-indigo-500 font-bold px-4 py-2 ${
                      item.active && "bg-gray-700"
                    } hover:bg-gray-700 rounded-md cursor-pointer`}
                  >
                    {item.nameUpper}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 pb-10 mx-auto max-w-md px-4 grid gap-4 lg:gap-12 sm:max-w-4xl sm:px-6 lg:px-8 sm:grid-cols-2  md:max-w-5xl md:grid-cols-2 xl:grid-cols-3 lg:max-w-full">
            {pokemon.map((item, index) => (
              <div
                className="flex items-center justify-between relative hover:bg-slate-700/50 rounded-md px-2 py-2  cursor-pointer"
                key={index}
              >
                <div className="flex items-center">
                  <span className="flex items-center mr-3 text-md text-slate-500">
                    {index + 1}
                  </span>
                  <div className="flex-shrink-0">
                    <Image
                      alt="pokemon"
                      src={item.sprites.other.home.front_default}
                      width={50}
                      height={50}
                      blurDataURL
                      placeholder="blur"
                      priority
                    />
                  </div>
                  <div className="flex flex-col ml-6">
                    <div
                      className={`flex items-center  bg-slate-700 rounded-md px-2 w-max py-1 space-x-1`}
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
                                  getPokemonElementType(item.types[0].type.name)
                                    .hex
                                }, ${
                                  getPokemonElementType(item.types[1].type.name)
                                    .hex
                                })`,
                              }
                        }
                      >
                        #{Math.floor(Math.random() * 900000)}
                      </div>
                    </div>
                    <span className="capitalize mt-1 text-xs font-bold text-slate-500">
                      Oct 19, 2022
                    </span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 px-2 py-1 space-y-4 flex flex-col items-end justify-end">
                  <span className="capitalize text-sm font-bold text-slate-300">
                    ${Math.floor(Math.random() * 500)}
                  </span>
                  <div className="flex items-center">
                    <Image alt="token" src={bgToken} width={20} height={20} />
                    <span className="capitalize text-sm font-bold text-slate-300 ">
                      {getPriceToToken(Math.floor(Math.random() * 500))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSales;
