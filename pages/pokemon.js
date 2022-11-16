import Head from "next/head";
import React from "react";
import Breadcumb from "@/components/Breadcumb";
import AllFilters from "@/components/PokemonPages/AllFilters";
import OverallStats from "@/components/HomePages/OverallStats";
import ListPokemon from "@/components/PokemonPages/ListPokemon";

const PokemonPages = () => {
  return (
    <>
      <div className="h-screen bg-gray-900 min-h-full flex-1">
        <Head>
          <title>Pokemons | Pokechains Marketplace</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="relative overflow-hidden">
          <main>
            <Breadcumb />
            <AllFilters />
            <ListPokemon />
          </main>
        </div>
      </div>
    </>
  );
};

export default PokemonPages;
