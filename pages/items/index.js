import Breadcumb from "@/components/Breadcumb";
import AllFilterItems from "@/components/ItemPages/AllFilters";
import ListItems from "@/components/ItemPages/ListItems";
import Head from "next/head";
import React from "react";

const ItemPages = () => {
  const item = [
    {
      type: "awakening",
    },
    {
      type: "full-heal",
    },
    {
      type: "master-ball",
    },
    {
      type: "max-revive",
    },
    {
      type: "medium-ball",
    },
    {
      type: "potion",
    },
    {
      type: "protein",
    },
    {
      type: "revive",
    },
    {
      type: "ultra-ball",
    },
    {
      type: "x-attack",
    },
    {
      type: "x-defense",
    },
  ];
  return (
    <>
      <div className="h-screen bg-gray-900 min-h-full flex-1">
        <Head>
          <title>Items | Pokechains Marketplace</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="relative overflow-hidden">
          <main>
            <Breadcumb />
            <AllFilterItems />
            <ListItems items={item} />
          </main>
        </div>
      </div>
    </>
  );
};

export default ItemPages;
