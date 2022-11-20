import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { classNames } from "@/utils/constant";
import { getPokemonElementType } from "constant-pokechain";
import Image from "next/image";
const AllFilters = ({selectedElement, setSelectedElement}) => {
  const filterElement = [
    {
      name: "normal",
      active: false,
    },
    {
      name: "fighting",
      active: false,
    },
    {
      name: "flying",
      active: false,
    },
    {
      name: "poison",
      active: false,
    },
    {
      name: "ground",
      active: false,
    },
    {
      name: "rock",
      active: false,
    },
    {
      name: "bug",
      active: false,
    },
    {
      name: "ghost",
      active: false,
    },
    {
      name: "steel",
      active: false,
    },
    {
      name: "fire",
      active: false,
    },
    {
      name: "water",
      active: false,
    },
    {
      name: "grass",
      active: false,
    },
    {
      name: "electric",
      active: false,
    },
    {
      name: "psychic",
      active: false,
    },
    {
      name: "ice",
      active: false,
    },
    {
      name: "dragon",
      active: false,
    },
    {
      name: "dark",
      active: false,
    },
    {
      name: "fairy",
      active: false,
    },
    {
      name: "unknown",
      active: false,
    },
    {
      name: "shadow",
      active: false,
    },
  ];


  const [useFilterElement, setUseFilterElement] = useState(true);

  return (
    <div>
      <div className="relative py-7 px-8 lg:px-12">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className={`inline-flex justify-center w-full rounded-md border ${
                selectedElement.length > 0
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
                {useFilterElement && selectedElement.length > 0 && (
                  <span className="ml-1">({selectedElement.length})</span>
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
            <Menu.Items className="transform z-40 mt-2 absolute left-0 w-72  origin-top-left bg-black divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-2 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-white font-medium">Filter</span>
                  <div className="p-2 cursor-pointer flex items-center justify-center  rounded-md bg-rose-500 hover:bg-rose-600/50" onClick={()=>{
                    setSelectedElement([])
                  }}>
                    <span className="text-white text-sm">Reset</span>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <div className="py-2 px-4">
                  <div
                    className="cursor-pointer w-full flex items-center select-none"
                    onClick={() => setUseFilterElement(!useFilterElement)}
                  >
                    {useFilterElement ? (
                      <ChevronDownIcon className="w-7 h-7 text-slate-500 mr-2" />
                    ) : (
                      <ChevronUpIcon className="w-7 h-7 text-slate-500 mr-2" />
                    )}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-md text-white font-bold ">
                        Element
                      </span>
                      {selectedElement.length > 0 && (
                        <div className="px-2 rounded-full bg-amber-500">
                          <span className="text-white font-bold">
                            {selectedElement.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {useFilterElement && (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mt-2 select-none">
                        {filterElement.map((element, index) => {
                          const pokemonElement = getPokemonElementType(
                            element.name
                          );
                          return (
                            <div
                              key={index}
                              className="cursor-pointer bg-slate-800 rounded-md px-2 w-max py-1 border border-transparent hover:border-gray-700 transition duration-150 hover:ease-in-out"
                              style={
                                selectedElement.includes(element.name)
                                  ? { borderColor: pokemonElement.hex }
                                  : {}
                              }
                              onClick={() => {
                                if (selectedElement.includes(element.name)) {
                                  setSelectedElement(
                                    selectedElement.filter(
                                      (item) => item !== element.name
                                    )
                                  );
                                } else {
                                  setSelectedElement([
                                    ...selectedElement,
                                    element.name,
                                  ]);
                                }
                              }}
                            >
                              <div
                                key={index}
                                className="flex items-center space-x-2 text-sm font-extrabold text-white"
                              >
                                <Image
                                  alt={element.name}
                                  src={pokemonElement.img}
                                  width={20}
                                  height={20}
                                />
                                <span
                                  className="text-md font-bold capitalize"
                                  style={{ color: pokemonElement.hex }}
                                >
                                  {element.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default AllFilters;
