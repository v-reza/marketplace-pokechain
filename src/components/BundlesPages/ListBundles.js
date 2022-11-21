import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { classNames, getPriceToToken } from "@/utils/constant";
import { getItemType, getRarity } from "constant-pokechain";
import axios from "axios";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import bgToken from "@/dist/token.png";
import { useRouter } from "next/router";

const ListBundles = (props) => {
  const { items } = props;
  const filter = [
    { id: 1, name: "Lowest Price", active: true },
    { id: 2, name: "Highest Price", active: false },
    { id: 3, name: "Lowest ID", active: false },
    { id: 4, name: "Highest ID", active: false },
    { id: 5, name: "Latest", active: false },
  ];
  const router = useRouter();
  const [pages, setPages] = useState(1);

  const [selected, setSelected] = useState(filter[0]);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomOffset, setRandomOffset] = useState(
    Math.floor(Math.random() * 800)
  );
  useEffect(() => {
    setPages(router.query.page ? router.query.page : 1);
  }, [router.query.page]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}&limit=12`
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
      <div className="relative py-7 px-8 lg:px-12">
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-white font-bold text-lg">200,678 Bundles</span>
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-black text-white  relative w-full border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer hover:bg-gray-700/50 focus:outline-none  sm:text-sm">
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
                      {filter.map((person) => (
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
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {person.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
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
        <div className="mt-4 pb-10 mx-auto max-w-md px-4 grid gap-4 lg:gap-12 sm:max-w-4xl sm:px-6 lg:px-8 sm:grid-cols-2  md:max-w-5xl md:grid-cols-2  xl:grid-cols-4 lg:max-w-full">
          {!loading
            ? items.map((item, index) => (
                <div
                  className="flex flex-col items-start space-y-2"
                  key={index}
                >
                  <div
                    key={index}
                    className="shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-black border border-slate-600  hover:border-slate-500 cursor-pointer"
                  >
                    <div
                      className={`h-60 w-full bg-opacity-25 rounded-t-lg shadow-lg`}
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),rgba(175,219,27,0))`,
                      }}
                    >
                      <div className="flex flex-col">
                        <div className="w-full h-40">
                          <div className="ml-8 sm:ml-10 md:ml-16 lg:ml-10 flex items-start gridBundlesContainer">
                            <div className="grid grid-cols-2 mt-4 md:gap-x-20 lg:gap-x-16  gap-y-4 gridBundlesItems">
                              {/* if more than 4 show length more */}
                              {item.types.length > 4 ? (
                                <>
                                  {item.types.slice(0, 3).map((type, index) => (
                                    <div key={index}>
                                      <Tooltip
                                        placement="top"
                                        content={
                                          <span className="capitalize">
                                            {getItemType(type).detail.name}
                                          </span>
                                        }
                                      >
                                        <Image
                                          alt="item"
                                          src={getItemType(type).img}
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
                                      + {item.types.length - 3} more
                                    </span>
                                  </div>
                                </>
                              ) : (
                                item.types.map((type, index) => (
                                  <div key={index}>
                                    <Tooltip
                                      placement="top"
                                      content={
                                        <span className="capitalize">
                                          {getItemType(type).detail.name}
                                        </span>
                                      }
                                    >
                                      <Image
                                        alt="item"
                                        src={getItemType(type).img}
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
                            <Image
                              alt="token"
                              src={bgToken}
                              width={30}
                              height={30}
                            />
                            <span className="capitalize text-sm font-bold text-slate-300 ">
                              {getPriceToToken(Math.floor(Math.random() * 500))}
                            </span>
                          </div>
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
                            <div className="flex items-center space-x-1">
                              <span className="text-md font-medium text-white capitalize">
                                Bundle
                              </span>
                              <span className="text-md font-medium text-white">
                                #{Math.floor(Math.random() * 900000)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs font-bold text-slate-400">
                                {item.types.length} items
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 text-slate-400 text-xs font-extrabold">
                    {Math.floor(Math.random() * 60) + " "}minute ago
                  </span>
                </div>
              ))
            : new Array(12).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="h-56 w-full animate-pulse bg-gray-700 rounded-lg" />
                </div>
              ))}
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div
              className={`ml-4 p-2  ${
                pages > 1
                  ? "cursor-pointer bg-gray-700 hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-800"
              } rounded-md`}
              onClick={() =>
                pages > 1 &&
                router.replace({
                  pathname: router.pathname,
                  query: { page: parseInt(pages) - 1 },
                })
              }
            >
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-md font-bold text-white">Page</span>
            <input
              type="number"
              value={pages}
              onChange={() => {}}
              className="w-12 h-10 text-center text-md font-bold text-white bg-gray-700 rounded-md"
            />
            <span className="text-md font-medium text-white">of 29,234</span>
            <div
              className="cursor-pointer ml-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-md"
              onClick={() =>
                router.replace({
                  pathname: router.pathname,
                  query: { page: parseInt(pages) + 1 },
                })
              }
            >
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBundles;
