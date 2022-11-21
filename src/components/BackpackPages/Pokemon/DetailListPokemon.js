import { HeartIcon, PencilIcon } from "@heroicons/react/outline";
import iconHealth from "@/dist/health.jpeg";
import iconAttack from "@/dist/attack.jpeg";
import iconDefense from "@/dist/defense.png";
import React from "react";
import Image from "next/image";
import { getEvolveItem, getPokemonElementType } from "constant-pokechain";
import { Tooltip } from "flowbite-react";
import { useQuery } from "react-query";
import { getPokemonEvolution } from "../schema/query";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import { useMediaQuery } from "react-responsive";

const DetailListPokemon = ({ open, setOpen, detailPokemon, detailRef }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { isFetching, data: isEvolve } = useQuery({
    queryKey: ["detailPokemon", detailPokemon.name],
    queryFn: () => getPokemonEvolution(detailPokemon.name),
    enabled: !!detailPokemon.name,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <div ref={detailRef}>
        <aside
          className={`${
            isMobile ? "w-full" : "w-96"
          } p-8 border-l border-slate-800 shadow-md shadow-slate-700 overflow-y-auto block`}
        >
          <div className="top-0 left-0">
            <div
              className="p-2  hover:bg-slate-700 rounded-full w-max cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {!isMobile ? (
                <XIcon className="w-8 h-8 text-white" />
              ) : (
                <ArrowLeftIcon className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
          <div className="pb-16 space-y-6">
            <div>
              <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <img
                  src={detailPokemon.front_default}
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium text-white capitalize">
                    {detailPokemon.name}
                  </h2>
                  <p className="text-sm font-medium text-gray-500">
                    Level {detailPokemon.level} / 10
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-white">Information</h3>
              <dl className="mt-2 border-t border-gray-200 divide-y divide-gray-200">
                <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                  <dd className="text-white flex items-center space-x-2">
                    <Image
                      alt="health"
                      src={iconHealth}
                      width={35}
                      height={35}
                    />
                    <span className="text-lg font-medium">
                      Health: {detailPokemon.health}
                    </span>
                  </dd>
                  <dd className="text-white flex items-center space-x-2">
                    <Image
                      alt="attack"
                      src={iconAttack}
                      width={35}
                      height={35}
                    />
                    <span className="text-lg font-medium">
                      Attack: {detailPokemon.attack}
                    </span>
                  </dd>
                  <dd className="text-white flex items-center space-x-2">
                    <Image
                      alt="defense"
                      src={iconDefense}
                      width={35}
                      height={35}
                    />
                    <span className="text-lg font-medium">
                      Defense: {detailPokemon.defense}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-medium text-white">Element</h3>
              <dl className="mt-2 border-t  border-gray-200 divide-y divide-gray-200">
                <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                  <div className={`flex flex-col space-y-4`}>
                    {detailPokemon.element.split(",").map((element, index) => {
                      const elementImage = getPokemonElementType(element);
                      return (
                        <div
                          key={index}
                          className="text-sm flex items-center space-x-2 font-extrabold text-white "
                        >
                          <Tooltip
                            placement="top"
                            content={
                              <span className="capitalize">{element}</span>
                            }
                          >
                            <Image
                              alt={index}
                              src={elementImage.img}
                              width={35}
                              height={35}
                              style={{ marginTop: "1px" }}
                            />
                          </Tooltip>
                          <span className="text-lg font-medium capitalize">
                            {element}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </dl>
            </div>
            <div>
              {!isFetching && isEvolve.results?.pokemon_evolutions.length > 0 && (
                <div>
                  <h3 className="font-medium text-white">Growth Evolution</h3>
                  {isEvolve.results?.pokemon_evolutions.map((evolve) => (
                    <div
                      className="flex flex-col items-start space-y-2 mt-4"
                      key={evolve.id}
                    >
                      <div className="shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-gray-700 border border-slate-600  hover:border-slate-500 cursor-pointer">
                        <div
                          className={`h-56 w-full bg-opacity-25 rounded-t-lg shadow-lg `}
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
                              getPokemonElementType(
                                evolve.element.split(",")[0]
                              ).rgba
                            })`,
                          }}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center justify-center">
                              <Image
                                alt="pokemon"
                                src={evolve.front_default}
                                width={200}
                                height={200}
                                blurDataURL
                                placeholder="blur"
                                priority
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded-b-lg p-6 flex flex-col justify-between">
                          <div className="flex-1">
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col w-full">
                                <div className="mt-4 flex items-start justify-between">
                                  <div>
                                    <h2 className="text-lg font-medium text-white capitalize">
                                      {evolve.name}
                                    </h2>
                                    <p className="text-sm font-medium text-gray-400">
                                      Level {evolve.level}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-8">
                                  <h3 className="font-medium text-white">
                                    Information
                                  </h3>
                                  <dl className="mt-2 border-t border-gray-200 divide-y divide-gray-200">
                                    <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                                      <dd className="text-white flex items-center space-x-2">
                                        <Image
                                          alt="health"
                                          src={iconHealth}
                                          width={35}
                                          height={35}
                                        />
                                        <span className="text-lg font-medium">
                                          Health: {evolve.health}
                                        </span>
                                      </dd>
                                      <dd className="text-white flex items-center space-x-2">
                                        <Image
                                          alt="attack"
                                          src={iconAttack}
                                          width={35}
                                          height={35}
                                        />
                                        <span className="text-lg font-medium">
                                          Attack: {evolve.attack}
                                        </span>
                                      </dd>
                                      <dd className="text-white flex items-center space-x-2">
                                        <Image
                                          alt="defense"
                                          src={iconDefense}
                                          width={35}
                                          height={35}
                                        />
                                        <span className="text-lg font-medium">
                                          Defense: {evolve.defense}
                                        </span>
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                                <div>
                                  <h3 className="font-medium text-white">
                                    Element
                                  </h3>
                                  <dl className="mt-2 border-t  border-gray-200 divide-y divide-gray-200">
                                    <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                                      <div
                                        className={`flex flex-col space-y-4`}
                                      >
                                        {evolve.element
                                          .split(",")
                                          .map((element, index) => {
                                            const elementImage =
                                              getPokemonElementType(element);
                                            return (
                                              <div
                                                key={index}
                                                className="text-sm flex items-center space-x-2 font-extrabold text-white "
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
                                                    width={35}
                                                    height={35}
                                                    style={{ marginTop: "1px" }}
                                                  />
                                                </Tooltip>
                                                <span className="text-lg font-medium capitalize">
                                                  {element}
                                                </span>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    </div>
                                  </dl>
                                </div>
                                {evolve.required_item && (
                                  <div>
                                    <h3 className="font-medium text-white">
                                      Required Evolution Item
                                    </h3>
                                    <dl className="mt-2 border-t  border-gray-200 divide-y divide-gray-200">
                                      <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                                        <div
                                          className={`flex flex-col space-y-4`}
                                        >
                                          <div className="text-sm flex items-center space-x-2 font-extrabold text-white ">
                                            <Tooltip
                                              placement="top"
                                              content={
                                                <span className="capitalize">
                                                  {evolve.required_item}
                                                </span>
                                              }
                                            >
                                              <Image
                                                alt="item"
                                                src={
                                                  getEvolveItem(
                                                    evolve.required_item
                                                  ).img
                                                }
                                                width={35}
                                                height={35}
                                                style={{ marginTop: "1px" }}
                                              />
                                            </Tooltip>
                                            <span className="text-lg font-medium capitalize">
                                              {evolve.required_item.replace(
                                                "-",
                                                " "
                                              )}
                                            </span>
                                            <span>
                                              {evolve.qty_required_item}x
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </dl>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex">
              <button
                type="button"
                className="flex-1 bg-rose-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sell
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default DetailListPokemon;
