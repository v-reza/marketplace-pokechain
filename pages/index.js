import Head from "next/head";
import OverallStats from "@/components/HomePages/OverallStats";
import TopSales from "@/components/HomePages/TopSales";
import RecentSales from "@/components/HomePages/RecentSales";
import RecentListings from "@/components/HomePages/RecentListings";
import useUser from "@/hooks/useUser";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import {
  getRecentListings,
  getRecentSales,
} from "@/components/HomePages/schema/query";

export default function IndexPages() {
  // const { currentUser } = useUser();
  // const { accessToken } = useSelector(state => state.auth)
  // console.log("accessToken => ", accessToken)
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
            <RecentSales />
            <RecentListings />
          </main>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recentSales", "pokemon"],
    queryFn: () => getRecentSales("pokemon"),
  });

  await queryClient.prefetchQuery({
    queryKey: ["recentListings", "pokemon"],
    queryFn: () => getRecentListings("pokemon"),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
