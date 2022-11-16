import ListItems from "@/components/BackpackPages/Items/ListItems";
import ListPokemon from "@/components/BackpackPages/Pokemon/ListPokemon";
import Tabs from "@/components/BackpackPages/Tabs";
import ListToken from "@/components/BackpackPages/Token/ListToken";
import Breadcumb from "@/components/Breadcumb";
import getSession from "@/middleware/getSession";
import Head from "next/head";
import { useState } from "react";

const BackpackPages = ({ isAuth }) => {
  const listTabs = [
    { name: "My Pokemon", href: "#", current: true },
    { name: "My Items", href: "#", current: false },
    { name: "My Bundles", href: "#", current: false },
    { name: "Token", href: "#", current: false },
  ];
  const [tabs, setTabs] = useState(listTabs[0]);

  const RenderTabsComponent = () => {
    if (tabs.name === "My Pokemon") {
      return (
        <ListPokemon
          TabsComponent={
            <Tabs listTabs={listTabs} setTabs={setTabs} tabs={tabs} />
          }
        />
      );
    } else if (tabs.name === "My Items") {
      return (
        <ListItems
          TabsComponent={
            <Tabs listTabs={listTabs} setTabs={setTabs} tabs={tabs} />
          }
        />
      );
    } else if (tabs.name === "Token") {
      return (
        <ListToken
          TabsComponent={
            <Tabs listTabs={listTabs} setTabs={setTabs} tabs={tabs} />
          }
        />
      );
    }
  };

  return (
    <div className="h-screen bg-gray-900 min-h-full flex-1 flex flex-col overflow-hidden">
      <Head>
        <title>Backpack | Pokechains Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Breadcumb />
      {isAuth ? (
        <RenderTabsComponent />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              Please login to see your backpack
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackpackPages;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return session;
};
