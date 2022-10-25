/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import OverallStats from "@/components/HomePages/OverallStats";
import TopSales from "@/components/HomePages/TopSales";
import RecentSales from "@/components/HomePages/RecentSales";
import RecentListings from "@/components/HomePages/RecentListings";

export default function IndexPages() {
  return (
    <>
      <div className="h-screen bg-gray-900 min-h-full flex-1">
        <Head>
          <title>Pokechain | Marketplace</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="relative overflow-hidden">
          <main>
            {/* Overall Stats */}
            <OverallStats />
            <TopSales />
            <RecentSales/>
            <RecentListings/>
          </main>
        </div>
      </div>
    </>
  );
}
