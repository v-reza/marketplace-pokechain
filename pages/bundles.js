import Breadcumb from "@/components/Breadcumb";
import AllFilterBundles from "@/components/BundlesPages/AllFilters";
import ListBundles from "@/components/BundlesPages/ListBundles";
import Head from "next/head";
import React, { useState } from "react";

const BundlesPages = () => {
  const [filterItem, setFilterItem] = useState([]);
  const [filterRarity, setFilterRarity] = useState([]);
  const item = [
    {
      types: ["awakening", "full-heal", "master-ball", "max-revive"],
    },
    {
      types: ["medium-ball", "master-ball"],
    },
    {
      types: [
        "potion",
        "protein",
        "revive",
        "ultra-ball",
        "x-attack",
        "x-defense",
      ],
    },
    {
      types: ["awakening", "protein", "master-ball", "ultra-ball"],
    },
    {
      types: ["revive", "x-attack", "medium-ball", "max-revive", "full-heal"],
    },
    {
      types: ["master-ball", "medium-ball", "ultra-ball"],
    },
  ];
  return (
    <>
      <div className="h-screen bg-gray-900 min-h-full flex-1">
        <Head>
          <title>Bundles | Pokechains Marketplace</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="relative overflow-hidden">
          <main>
            <Breadcumb />
            <AllFilterBundles setFilterItem={setFilterItem} filterItem={filterItem} setFilterRarity={setFilterRarity} filterRarity={filterRarity} />
            <ListBundles setFilterItem={setFilterItem} filterItem={filterItem} items={item} setFilterRarity={setFilterRarity} filterRarity={filterRarity} />
          </main>
        </div>
      </div>
    </>
  );
};

export default BundlesPages;
