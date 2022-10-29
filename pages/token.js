import Breadcumb from "@/components/Breadcumb";
import ListToken from "@/components/TokenPages/ListToken";
import Head from "next/head";
import React from "react";

const TokenPages = () => {
  return (
    <>
      <div className="h-screen bg-gray-900 min-h-full flex-1">
        <Head>
          <title>Token | Pokechains Marketplace</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="relative overflow-hidden">
          <main>
            <Breadcumb />
            <ListToken/>
          </main>
        </div>
      </div>
    </>
  );
};

export default TokenPages;
