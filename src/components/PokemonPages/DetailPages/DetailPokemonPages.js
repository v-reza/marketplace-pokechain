import { getPokemonElementType } from "constant-pokechain";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import attack from "@/dist/attack.jpeg";
import defense from "@/dist/defense.png";
import health from "@/dist/health.jpeg";
import logoBuy from "@/dist/logo-buy.png";
import token from "@/dist/token.png";
import React from "react";
import useActionClick from "@/hooks/useActionClick";
import { getPriceToToken } from "@/utils/constant";

const DetailPokemonPages = ({ item, isAuth }) => {
  const { isOpen } = useActionClick();

  const bodyParts = [
    {
      image: defense,
      title: "Defense",
    },
    {
      image: attack,
      title: "Attack",
    },
    {
      image: health,
      title: "Health",
    },
  ];

  const TypeElement = ({ type }) => {
    return (
      <div
        className={` w-max ${
          type === "evolution" ? "my-3 mx-3" : ""
        } py-1 flex items-center justify-center bg-slate-80xl`}
      >
        <div className={`flex items-center rounded-md space-x-1 mt-1`}>
          {item.pokemonById.element.split(",").map((element, index) => {
            const elementImage = getPokemonElementType(element);
            return (
              <div key={index} className="text-sm font-extrabold text-white ">
                <Tooltip
                  placement="top"
                  content={<span className="capitalize">{element}</span>}
                >
                  <Image
                    alt={index}
                    src={elementImage.img}
                    width={20}
                    height={20}
                  />
                </Tooltip>
              </div>
            );
          })}
        </div>
        <div
          className={`-mt-1 sm:-mt-0 text-md !ml-2 ${
            item.pokemonById.element.split(",").length > 0 &&
            "text-transparent bg-clip-text"
          }`}
          style={
            item.pokemonById.element.split(",").length === 1
              ? {
                  color: getPokemonElementType(
                    item.pokemonById.element.split(",")[0]
                  ).hex,
                }
              : {
                  backgroundImage: `linear-gradient(to right, ${
                    getPokemonElementType(
                      item.pokemonById.element.split(",")[0]
                    ).hex
                  }, ${
                    getPokemonElementType(
                      item.pokemonById.element.split(",")[1]
                    ).hex
                  })`,
                }
          }
        >
          #{item.pokemonById.increment_id}
        </div>
      </div>
    );
  };

  return (
    <div className={`max-w-full mt-10 my-10 ${isOpen ? "mx-8" : "mx-12"}`}>
      <div className="flex flex-col lg:flex-row mt-2 justify-center">
        <div className="w-full lg:basis-1/2">
          <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-white capitalize">
                {item.pokemonById.name.replace("-", " ")}
              </h2>
              <span className="text-lg font-medium text-white">
                #{item.pokemonById.increment_id}
              </span>
            </div>

            <div className="lg:hidden flex flex-row items-center justify-between space-x-12">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Image src={token} width={30} height={30} alt="token" />
                  <span className="text-white font-bold text-md">
                    {getPriceToToken(item.pokemonById.price)}
                  </span>
                </div>
                <span className="text-slate-400 font-medium text-md">
                  ${item.pokemonById.price}
                </span>
              </div>
              {!isAuth ? (
                <Tooltip
                  placement="top"
                  content={
                    <span className="text-white text-sm font-bold">
                      Please login to buy this item
                    </span>
                  }
                >
                  <div className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-800/50 cursor-not-allowed">
                    <div className="flex items-center space-x-2">
                      <Image src={logoBuy} width={18} height={20} alt="logo" />
                      <span className="text-slate-600 text-sm font-bold">
                        Buy now
                      </span>
                    </div>
                  </div>
                </Tooltip>
              ) : (
                <div
                  className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
                  // onClick={() => setOpenModalPayment(true)}
                >
                  <div className="flex items-center space-x-2">
                    <Image src={logoBuy} width={18} height={20} alt="logo" />
                    <span className="text-white text-sm font-bold">
                      Buy now
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-10 py-10 flex items-center  w-96">
            <div>
              <Image
                src={item.pokemonById.front_default}
                alt="pokemon"
                width={300}
                height={300}
                blurDataURL
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className="basis-2/3">
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-end space-x-5 py-4">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Image src={token} width={30} height={30} alt="token" />
                <span className="text-white font-bold text-md">
                  {getPriceToToken(item.pokemonById.price)}
                </span>
              </div>
              <span className="text-slate-400 font-medium text-md">
                ${item.pokemonById.price}
              </span>
            </div>
            {!isAuth ? (
              <Tooltip
                placement="top"
                content={
                  <span className="text-white text-sm font-bold">
                    Please login to buy this item
                  </span>
                }
              >
                <div className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-800/50 cursor-not-allowed">
                  <div className="flex items-center space-x-2">
                    <Image src={logoBuy} width={18} height={20} alt="logo" />
                    <span className="text-slate-600 text-sm font-bold">
                      Buy now
                    </span>
                  </div>
                </div>
              </Tooltip>
            ) : (
              <div
                className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
                // onClick={() => setOpenModalPayment(true)}
              >
                <div className="flex items-center space-x-2">
                  <Image src={logoBuy} width={18} height={20} alt="logo" />
                  <span className="text-white text-sm font-bold">Buy now</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col mb-10 rounded-xl px-10 py-10 min-h-screen bg-slate-800">
            <div className="flex flex-row ">
              <div className="flex flex-col ">
                <div className="mr-11 text-[10px]  text-slate-500 font-bold">
                  ELEMENT
                </div>
                <div className="py-1">
                  {item.pokemonById.element.split(",").map((element, index) => {
                    const elementImage = getPokemonElementType(element);
                    return (
                      <div
                        key={index}
                        className="flex text-sm capitalize text-white "
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
                            width={20}
                            height={20}
                          />
                        </Tooltip>
                        &nbsp;{element}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="ml-10 text-[10px]   text-slate-500 font-bold">
                  BREED COUNT
                </div>
                <div className="flex text-sm capitalize text-white py-1 tracking-widest ml-10">
                  0/7{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-5 ml-1 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mt-4 text-[10px]  text-slate-500 font-bold">
                OWNER
              </div>
              <div className="text-white font-medium">
                {item.pokemonById.marketplace.seller.full_name || "B.Name"}{" "}
                <span className="text-xs text-slate-600">
                  (ronin:{item.pokemonById.marketplace.seller.id})
                </span>
              </div>
            </div>
            <div className="my-5 border-b border-slate-600"></div>
            <div className="flex flex-col">
              <div className="text-[10px]  text-slate-500 font-bold">
                BODY PARTS
              </div>
              <div className="flex flex-row flex-wrap px-2 ">
                {bodyParts.map((data, i) => (
                  <div
                    className="basis-1/2 flex flex-row items-center space-x-4 text-white my-4"
                    key={i}
                  >
                    <div>
                      <Image
                        src={data.image}
                        alt="pokemon"
                        width={50}
                        height={50}
                        blurDataURL
                        placeholder="blur"
                      />
                    </div>
                    <div>{data.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-5 border-b border-slate-600"></div>
            <div className="flex flex-col">
              <div className="text-[10px]  text-slate-500 font-bold">
                EVOLUTION DETAIL
              </div>
              <div
                className={`flex flex-col lg:flex-row flex-wrap py-5  ${
                  item.pokemonWithEvolution.pokemon_evolutions.length === 1
                    ? ""
                    : "justify-center"
                }`}
              >
                {item.pokemonWithEvolution.pokemon_evolutions.length > 0 ? (
                  item.pokemonWithEvolution.pokemon_evolutions.map(
                    (data, index) => (
                      <div
                        key={index}
                        className={`w-full lg:w-64 h-56 bg-slate-600 mb-[70px] ${
                          index === 0 ? "" : "mt-10 "
                        } lg:mt-0 rounded-md lg:mx-5 d bg-opacity-25 rounded-t-lg shadow-lg flex flex-col`}
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
                            getPokemonElementType(data.element.split(",")[0])
                              .rgba
                          })`,
                        }}
                      >
                        <div>
                          <TypeElement type="evolution" />
                        </div>
                        <div className="flex items-center justify-center ">
                          <div>
                            <Image
                              src={data.front_default}
                              alt="pokemon"
                              width={100}
                              height={100}
                              blurDataURL
                              placeholder="blur"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row justify-between bg-slate-700 rounded-b-lg p-6 mt-10  ">
                          <div className="flex flex-col text-white">
                            Pokemon #0323424{" "}
                            <span className="text-xs text-slate-400">
                              sasasa
                            </span>
                          </div>
                          <Tooltip
                            placement="top"
                            content={
                              <div className="w-72 h-40 ">
                                <div className="px-4">
                                  <div className="flex flex-col">
                                    <span className="text-md font-bold text-slate-300 capitalize">
                                      Seller :{" "}
                                      {
                                        item.pokemonById.marketplace.seller.user
                                          .username
                                      }
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
                                        {data.element
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
                    )
                  )
                ) : (
                  <div className="flex items-center justify-center text-white text-medium lg:mt-10 ">
                    No Have Evolution
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="capitalize text-white font-bold text-lg py-2">
            Sale History
          </div>
          <div className="min-h-0  bg-slate-800 rounded-t-xl flex flex-col ">
            <div className="flex flex-col lg:flex-row justify-between px-10 py-5">
              <div className="flex flex-col my-3 lg:my-0">
                <div className="text-[10px]  text-slate-500 font-bold">
                  BUYER
                </div>
                <div className="text-white font-medium">B.Stery</div>
                <span className="text-xs text-slate-600  text-ellipsis lg:w-48 ">
                  (ronin:{item.pokemonById.marketplace.seller.id})
                </span>
              </div>
              <div className="flex flex-col">
                <div className="text-[10px]  text-slate-500 font-bold">
                  SELLER
                </div>
                <div className="text-white font-medium">B.Stery</div>
                <span className="text-xs text-slate-600  text-clip lg:w-48 ">
                  (ronin:{item.pokemonById.marketplace.seller.id})
                </span>
              </div>
              <div className="flex flex-col mt-4">
                <div className="text-white">0.002 ETH</div>
                <span className="text-xs text-slate-600  text-clip  ">
                  10 hours ago
                </span>
              </div>
            </div>
            <div className=" border-b border-slate-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPokemonPages;
