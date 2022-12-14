import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { classNames } from "@/utils/constant";
import {
  getPokemonElementType,
  getItemType,
  getRarity,
} from "constant-pokechain";
import Image from "next/image";
const AllFilterBundles = ({filterItem, setFilterItem,filterRarity,setFilterRarity}) => {
  console.log(filterItem)
  console.log(filterRarity)
  const filterItems = [
    {
      name: "awakening",
      active: false,
    },
    {
      name: "full-heal",
      active: false,
    },
    {
      name: "master-ball",
      active: false,
    },
    {
      name: "max-revive",
      active: false,
    },
    {
      name: "medium-ball",
      active: false,
    },
    {
      name: "potion",
      active: false,
    },
    {
      name: "protein",
      active: false,
    },
    {
      name: "revive",
      active: false,
    },
    {
      name: "ultra-ball",
      active: false,
    },
    {
      name: "x-attack",
      active: false,
    },
    {
      name: "x-defense",
      active: false,
    },
  ];
  const filterRaritys = [
    {
      name: "common",
      active: false,
    },
    {
      name: "rare",
      active: false,
    },
    {
      name: "epic",
      active: false,
    },
    {
      name: "legendary",
      active: false,
    },
  ];

  

  return (
    <div>
      <div className="relative py-7 px-8 lg:px-12">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className={`inline-flex justify-center w-full rounded-md border ${
                filterItem.length > 0
                  ? "border-indigo-500 text-indigo-500"
                  : "border-gray-700 text-white"
              }  shadow-sm px-4 py-2 bg-black text-sm  font-medium hover:bg-gray-700/50 focus:outline-none`}
            >
              <AdjustmentsIcon
                className="mr-2 -ml-1 h-5 w-5"
                aria-hidden="true"
              />
              <div className="flex items-center">
                <span>All Filters</span>
                {filterItem.length > 0 &&filterRarity.length > 0 ? (
                  <span className="ml-1">(2)</span>
                ) : filterItem.length > 0 ||filterRarity.length > 0 ? (
                  <span className="ml-1">(1)</span>
                ) : (
                  ""
                )}
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="transform z-40 mt-2  absolute left-0 w-80  origin-top-left bg-black divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-2 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-white font-medium">Filter</span>
                  <div className="p-2 cursor-pointer flex items-center justify-center  rounded-md bg-rose-500 hover:bg-rose-600/50">
                    <span
                      className="text-white text-sm"
                      onClick={() => {
                       setFilterItem([]);
                        setFilterRarity([]);
                      }}
                    >
                      Clear Filter
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <div className="py-2 px-4">
                  <div className="cursor-pointer w-full flex items-center select-none">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-slate-500 font-extrabold ">
                        Items
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 select-none">
                      {filterItems.map((item, index) => {
                        const itemType = getItemType(item.name);
                        return (
                          <div
                            key={index}
                            className="cursor-pointer bg-slate-800 rounded-md px-2 w-max py-1 border border-transparent hover:border-gray-700 transition duration-150 hover:ease-in-out"
                            style={
                              filterItem.includes(item.name)
                                ? { borderColor: itemType.hex }
                                : {}
                            }
                            onClick={() => {
                              if (filterItem.includes(item.name)) {
                               setFilterItem(
                                  filterItem.filter(
                                    (prev) => prev !== item.name
                                  )
                                );
                              } else {
                               setFilterItem([...filterItem, item.name]);
                              }
                            }}
                          >
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-sm font-extrabold text-white"
                            >
                              <Image
                                alt={item.name}
                                src={itemType.img}
                                width={20}
                                height={20}
                              />
                              <span
                                className="text-md font-bold capitalize"
                                style={{ color: itemType.hex }}
                              >
                                {item.name.replace("-", " ")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <div className="py-2 px-4">
                  <div className="cursor-pointer w-full flex items-center select-none">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-slate-500 font-extrabold ">
                        Rarity
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 select-none">
                      {filterRaritys.map((item, index) => {
                        const itemType = getRarity(item.name);
                        return (
                          <div
                            key={index}
                            className="cursor-pointer bg-slate-800 rounded-md px-2 w-max py-1 border border-transparent hover:border-gray-700 transition duration-150 hover:ease-in-out"
                            style={
                             filterRarity.includes(item.name)
                                ? { borderColor: itemType.hex }
                                : {}
                            }
                            onClick={() => {
                              if (filterRarity.includes(item.name)) {
                                setFilterRarity(
                                 filterRarity.filter(
                                    (prev) => prev !== item.name
                                  )
                                );
                              } else {
                                setFilterRarity([
                                  item.name,
                                ]);
                              }
                            }}
                          >
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-sm font-extrabold text-white"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                style={{ color: itemType.hex }}
                              >
                                <path
                                  d="M9.5 9.5S11 2 12 2s2.5 7.5 2.5 7.5S21 11 21 12s-6.5 2.5-6.5 2.5S13 22 12 22s-2.5-7.5-2.5-7.5S3 13 3 12s6.5-2.5 6.5-2.5Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <span
                                className="text-md font-bold capitalize"
                                style={{ color: itemType.hex }}
                              >
                                {item.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default AllFilterBundles;
