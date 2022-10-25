import React from "react";
import bgSalesStats from "@/dist/sales-stats.png";
import bgToken from "@/dist/token.png";
import bgPikachu from "@/dist/pikachu.png";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "@/utils/constant";

const OverallStats = () => {
  const filterTime = [
    { id: 1, name: "24 hours", nameUpper: "24H", active: true },
    { id: 2, name: "7 days", nameUpper: "7D", active: false },
    { id: 3, name: "30 days", nameUpper: "30D", active: false },
  ];
  const [selected, setSelected] = useState(filterTime[0]);

  return (
    <div>
      <div className="relative py-16 sm:py-24 lg:py-20 lg:px-12">
        <div className="relative bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between text-left mx-auto max-w-md px-4 sm:max-w-4xl sm:px-6 lg:px-8 lg:max-w-full py-8">
            <p className="text-xl sm:text-2xl md:text-2xl font-extrabold text-white tracking-tight">
              Overall Stats
            </p>
            <div className="hidden space-x-2 sm:flex items-center">
              <div className="text-indigo-500 font-bold px-4 py-2 bg-gray-700 hover:bg-gray-700 rounded-md cursor-pointer">
                24H
              </div>
              <div className="text-indigo-500 font-bold px-4 py-2  hover:bg-gray-700 rounded-md cursor-pointer">
                7D
              </div>
              <div className="text-indigo-500 font-bold px-4 py-2  hover:bg-gray-700 rounded-md cursor-pointer">
                30D
              </div>
            </div>
            <div className="block sm:hidden">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <div className="mt-1 relative">
                      <Listbox.Button className="bg-black text-white relative w-full border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none  sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
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
          <div className="mt-4 pb-10 mx-auto max-w-md px-4 grid gap-4 sm:max-w-4xl sm:px-6 lg:px-8 sm:grid-cols-2  md:max-w-5xl md:grid-cols-3 lg:grid-cols-3 lg:max-w-full">
            <div className="flex space-x-2">
              <Image
                alt="sales_stats"
                src={bgSalesStats}
                width={40}
                height={40}
              />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-400">
                  Total Sales
                </span>
                <span className="text-md font-extrabold text-white">8.000</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Image alt="sales_stats" src={bgToken} width={40} height={40} />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-400">
                  Total Volume
                </span>
                <span className="text-md font-extrabold text-white">
                  {process.env.formatCurrency}120.890
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Image
                alt="pokemmon_sold"
                src={bgPikachu}
                width={40}
                height={40}
              />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-400">
                  Pokemons Sold
                </span>
                <span className="text-md font-extrabold text-white">2.220</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStats;
