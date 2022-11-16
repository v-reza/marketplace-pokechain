import Breadcumb from "@/components/Breadcumb";
import DetailItemPages from "@/components/ItemPages/DetailPages/DetailItemPages";
import { getItemsById } from "@/components/ItemPages/schema/query";
import getSession from "@/middleware/getSession";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

const DetailItems = ({ isAuth, ...props }) => {
  const router = useRouter()
  const { data: detailItemPages } = useQuery({
    queryKey: ["detailItem", router.query.id],
    queryFn: () => getItemsById(router.query.id),
  })
  
  return (
    <div className="h-screen bg-gray-900 min-h-full flex-1">
      <Head>
        <title>Detail Items | Pokechains Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative overflow-hidden">
        <main>
          <Breadcumb />
          <DetailItemPages item={detailItemPages.results} isAuth={isAuth}/>
        </main>
      </div>
    </div>
  );
};

export default DetailItems;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const queryClient = new QueryClient()
  
  await queryClient.prefetchQuery({
    queryKey: ["detailItem", params.id],
    queryFn: () => getItemsById(params.id),
  })
  const session = await getSession(context);
  // console.log(session.props.isAuth)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isAuth: session.props.isAuth
    }
  }
}