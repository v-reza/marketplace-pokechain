import DetailPokemonPages from '@/components/PokemonPages/DetailPages/DetailPokemonPages'
import  Breadcumb  from '@/components/Breadcumb'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import getSession from '@/middleware/getSession'
import { getPokemonByIncrementId } from '@/components/PokemonPages/schema/query'

const DetailPokemon = ({isAuth}) => {
  const router = useRouter()
  const { data: detailPokemonPages} = useQuery({
    queryKey: ["detailPokemon", router.query.id],
    queryFn: () => getPokemonByIncrementId(router.query.id),
  })
  return (
    <div className="h-screen bg-gray-900 min-h-full flex-1">
      <Head>
        <title>Detail Pokemon | Pokechains Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative overflow-hidden">
        <main>
          <Breadcumb />
          <DetailPokemonPages  item={detailPokemonPages?.results} isAuth={isAuth}/>
        </main>
      </div>
    </div>
  );
}

export default DetailPokemon

export const getServerSideProps = async (context) => {
    const { params } = context;
    const queryClient = new QueryClient()
    
    await queryClient.prefetchQuery({
      queryKey: ["detailPokemon", params.id],
      queryFn: () => getPokemonByIncrementId(params.id),
    })
    const session = await getSession(context);
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        isAuth: session.props.isAuth
      }
    }
  }