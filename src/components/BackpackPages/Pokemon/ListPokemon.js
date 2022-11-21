import React, { useRef } from "react";
import { useState } from "react";
import { getPokemonElementType } from "constant-pokechain";
import { useQuery } from "react-query";
import { useAxios } from "@/utils/axiosInstance";
import { getBackpackPokemon } from "../schema/query";
import SkeletonCard from "../../SkeletonCard";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import DetailListPokemon from "./DetailListPokemon";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const ListPokemon = ({ TabsComponent }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [openDetail, setOpenDetail] = useState(false);
  const [openDetailMobile, setOpenDetailMobile] = useState(false);
  const [detailPokemon, setDetailPokemon] = useState(null);

  const detailRef = useRef();
  const axiosInstance = useAxios();
  const {
    data: listPokemon,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: "listPokemon",
    queryFn: () => getBackpackPokemon(axiosInstance),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setOpenDetailMobile(false);
    }
  }, [isMobile]);

  return (
    <>
      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <h1 className="flex-1 text-2xl font-bold text-white">Backpack</h1>
            </div>

            {/* Tabs */}
            {TabsComponent}

            <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
              <ul
                role="list"
                className={`${
                  !openDetailMobile &&
                  "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                }`}
              >
                {!isLoading ? (
                  !openDetailMobile ? (
                    listPokemon?.my_pokemons.map((item) => (
                      <li
                        key={item.id}
                        className="relative"
                        onClick={() => {
                          setOpenDetail(true);
                          isMobile && setOpenDetailMobile(true);
                          setDetailPokemon(item.detail_pokemon);
                          !isMobile &&
                            detailRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }}
                      >
                        <div className="flex flex-col items-start space-y-2">
                          <div className="shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-gray-700 border border-slate-600  hover:border-slate-500 cursor-pointer">
                            <div
                              className={`h-56 w-full bg-opacity-25 rounded-t-lg shadow-lg `}
                              style={{
                                backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
                                  getPokemonElementType(
                                    item.detail_pokemon.element.split(",")[0]
                                  ).rgba
                                })`,
                              }}
                            >
                              <div className="flex items-center w-full">
                                <div className="px-4 flex items-start justify-start py-2 ">
                                  <div className="flex flex-col">
                                    <div
                                      className={`flex items-center  rounded-md px-2 w-max py-1 space-x-1`}
                                    >
                                      {item.detail_pokemon.element
                                        .split(",")
                                        .map((element, index) => {
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col items-center justify-center">
                                  <Image
                                    alt="pokemon"
                                    src={item.detail_pokemon.front_default}
                                    width={100}
                                    height={100}
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
                                  <div className="flex flex-col">
                                    <div className="flex items-center space-x-1">
                                      <div
                                        className={`flex items-center  text-md font-medium capitalize ${
                                          item.detail_pokemon.element.split(",")
                                            .length > 0 &&
                                          "text-transparent bg-clip-text"
                                        }`}
                                        style={
                                          item.detail_pokemon.element.split(",")
                                            .length === 1
                                            ? {
                                                color: getPokemonElementType(
                                                  item.detail_pokemon.element.split(
                                                    ","
                                                  )[0]
                                                ).hex,
                                              }
                                            : {
                                                backgroundImage: `linear-gradient(to right, ${
                                                  getPokemonElementType(
                                                    item.detail_pokemon.element.split(
                                                      ","
                                                    )[0]
                                                  ).hex
                                                }, ${
                                                  getPokemonElementType(
                                                    item.detail_pokemon.element.split(
                                                      ","
                                                    )[1]
                                                  ).hex
                                                })`,
                                              }
                                        }
                                      >
                                        {item.detail_pokemon.name}
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-md font-medium text-white capitalize">
                                    Level {item.detail_pokemon.level}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <DetailListPokemon
                      open={openDetailMobile}
                      setOpen={setOpenDetailMobile}
                      detailPokemon={detailPokemon}
                      detailRef={detailRef}
                    />
                  )
                ) : (
                  <SkeletonCard length={20} width="w-full" />
                )}
              </ul>
            </section>
          </div>
        </main>

        {/* Details sidebar */}
        {openDetail && !isMobile && (
          <>
            <div className="hidden lg:block">
              <DetailListPokemon
                open={!isMobile && openDetail}
                setOpen={!isMobile && setOpenDetail}
                detailPokemon={detailPokemon}
                detailRef={detailRef}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListPokemon;
