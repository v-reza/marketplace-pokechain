import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { classNames, getPriceToToken } from "@/utils/constant";
import { getPokemonElementType } from "constant-pokechain";
import axios from "axios";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import bgToken from "@/dist/token.png";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { getAllPokemon } from "./schema/query";
import moment from "moment";

const ListPokemon = () => {
  const queryClient = useQueryClient();
  const filter = [
    { id: 1, name: "Lowest Price", active: true },
    { id: 2, name: "Highest Price", active: false },
    { id: 3, name: "Lowest ID", active: false },
    { id: 4, name: "Highest ID", active: false },
    { id: 5, name: "Latest", active: false },
  ];
  const router = useRouter();
  const [pages, setPages] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data: allPokemon,
    isFetching,
    isRefetching,
    isFetched,
    isPreviousData,
    refetch,
  } = useQuery({
    queryKey: ["allPokemon", pages],
    queryFn: () => getAllPokemon(pages),
    keepPreviousData: true,
  });

  const [selected, setSelected] = useState(filter[0]);

  useEffect(() => {
    setPages(router.query.page ? router.query.page : 1);
  }, [router.query.page]);

  return (
    <div>
      <div className="relative py-7 px-8 lg:px-12">
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-white font-bold text-lg">
            {!isLoading ? allPokemon.total : 0} Pokemon
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
            ? allPokemon.results?.map((item, index) => (
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
                                const elementImage =
                                  getPokemonElementType(element);
                                return (
                                  <div
                                    key={index}
                                    className="text-sm font-extrabold text-white "
                                  >
                                    <Tooltip
                                      placement="top"
                                      content={
                                        <span className="capitalize">
                                          {element}
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
                                          getPokemonElementType(
                                            item.element.split(",")[0]
                                          ).hex
                                        }, ${
                                          getPokemonElementType(
                                            item.element.split(",")[1]
                                          ).hex
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
                              <span className="text-md font-medium text-white">
                                Pokemon
                              </span>
                              <span className="text-md font-medium text-white">
                                #{item.increment_id}
                              </span>
                            </div>
                          </div>
                          <Tooltip
                            placement="top"
                            content={
                              <div className="w-72 h-40 ">
                                <div className="px-4">
                                  <div className="flex flex-col">
                                    <span className="text-md font-bold text-slate-300 capitalize">
                                      Seller :{" "}
                                      {item.marketplace.seller.user.username}
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
                                          .map((el, index) => (
                                            <span key={index}>{el} </span>
                                          ))
                                          .reduce((prev, curr) => [
                                            prev,
                                            ", ",
                                            curr,
                                          ])}
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
                  <span className="px-2 text-slate-400 text-xs font-extrabold">
                    {moment(item.created_at).fromNow()}
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
                allPokemon?.hasPrevious
                  ? "cursor-pointer bg-gray-700 hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-800"
              } rounded-md`}
              onClick={() =>
                allPokemon?.hasPrevious &&
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
              of {allPokemon?.totalPages}
            </span>
            <div
              className={`ml-4 p-2  ${
                allPokemon?.hasNext
                  ? "cursor-pointer bg-gray-700 hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-800"
              } rounded-md`}
              onClick={() => {
                if (allPokemon?.hasNext) {
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

export default ListPokemon;
