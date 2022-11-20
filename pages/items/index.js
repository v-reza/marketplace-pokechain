import Breadcumb from "@/components/Breadcumb";
import AllFilterItems from "@/components/ItemPages/AllFilters";
import ListItems from "@/components/ItemPages/ListItems";
import { getAllItems } from "@/components/ItemPages/schema/query";
import Head from "next/head";
import React, { useState } from "react";
import { dehydrate, QueryClient } from "react-query";

const ItemPages = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRarity, setSelectedRarity] = useState([]);

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
            <AllFilterItems
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              selectedRarity={selectedRarity}
              setSelectedRarity={setSelectedRarity}
            />
            <ListItems
              selectedItems={selectedItems}
              selectedRarity={selectedRarity}
            />
          </main>
        </div>
      </div>
    </>
  );
};

// export const getStaticProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery({
//     queryKey: [
//       "allItems",
//       { pages: "1" },
//       { sort: "lowest_price" },
//       { filterItems: [] },
//       { filterRarity: [] },
//     ],
//     queryFn: () => getAllItems("1", "lowest_price", [], []),
    
//   });
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default ItemPages;
