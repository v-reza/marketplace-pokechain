import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { classNames, getPriceToToken } from "@/utils/constant";
import { getItemType, getPokemonElementType } from "constant-pokechain";
import axios from "axios";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import bgToken from "@/dist/token.png";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { getAllItems } from "./schema/query";
import moment from "moment";
import Link from "next/link";

const ListItems = (props) => {
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
  const { data: allItems, isFetching } = useQuery({
    queryKey: ["allItems", pages],
    queryFn: () => getAllItems(pages),
    keepPreviousData: true,
  });

  const [selected, setSelected] = useState(filter[0]);

  useEffect(() => {
    setPages(router.query.page ? router.query.page : 1);
    if (pages > allItems?.totalPages) {
      router.replace({
        pathname: router.pathname,
        query: { page: allItems?.totalPages },
      });
    }
  }, [router.query.page, allItems?.totalPages]);

  if (selected.id === 1) {
    //lowest price
    allItems?.results.sort((a, b) => a.price - b.price);
  } else if (selected.id === 2) {
    //highest price
    allItems?.results.sort((a, b) => b.price - a.price);
  } else if (selected.id === 3) {
    //lowest id
    allItems?.results.sort((a, b) => a.increment_id - b.increment_id);
  } else if (selected.id === 4) {
    //highest id
    allItems?.results.sort((a, b) => b.increment_id - a.increment_id);
  } else if (selected.id === 5) {
    //latest
    allItems?.results.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }

  return (
    <div>
      <div className="relative py-7 px-8 lg:px-12">
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-white font-bold text-lg">
            {allItems?.total} Items
          </span>
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
          {!isFetching
            ? allItems.results.map((item, index) => (
                <Link key={index} href={`/items/${item.increment_id}`}>
                  <div
                    className="flex flex-col items-start space-y-2"
                    key={index}
                  >
                    <div
                      key={index}
                      className="shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-gray-700 border border-slate-600  hover:border-slate-500 cursor-pointer"
                    >
                      <div
                        className={`h-56 w-full bg-opacity-25 rounded-t-lg shadow-lg `}
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
                                <div
                                  key={index}
                                  className="text-sm font-extrabold text-white "
                                >
                                  <Tooltip
                                    placement="top"
                                    content={
                                      <span className="capitalize">
                                        {
                                          getItemType(item.name).detail.rarity
                                            .name
                                        }
                                      </span>
                                    }
                                  >
                                    <svg
                                      viewBox="0 0 24 24"
                                      width="16"
                                      height="16"
                                      style={{
                                        color: getItemType(item.name).detail
                                          .rarity.hex,
                                      }}
                                    >
                                      <path
                                        d="M9.5 9.5S11 2 12 2s2.5 7.5 2.5 7.5S21 11 21 12s-6.5 2.5-6.5 2.5S13 22 12 22s-2.5-7.5-2.5-7.5S3 13 3 12s6.5-2.5 6.5-2.5Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </Tooltip>
                                </div>

                                <div
                                  className={`flex items-center  text-sm font-extrabold !ml-2 `}
                                  style={{
                                    color: getItemType(item.name).detail.rarity
                                      .hex,
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
                              alt="item"
                              src={getItemType(item.name).img}
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
                    <span className="px-2 text-slate-400 text-xs font-extrabold">
                      {moment(item.created_at).fromNow()}
                    </span>
                  </div>
                </Link>
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
                allItems?.hasPrevious
                  ? "cursor-pointer bg-gray-700 hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-800"
              } rounded-md`}
              onClick={() =>
                allItems?.hasPrevious &&
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
            <span className="text-md font-medium text-white">
              of {allItems?.totalPages}
            </span>
            <div
              className={`ml-4 p-2  ${
                allItems?.hasNext
                  ? "cursor-pointer bg-gray-700 hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-800"
              } rounded-md`}
              onClick={() => {
                if (allItems?.hasNext) {
                  // queryClient.refetchQueries("allPokemon")
                  router.replace({
                    pathname: router.pathname,
                    query: { page: parseInt(pages) + 1 },
                  });
                }
              }}
            >
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
