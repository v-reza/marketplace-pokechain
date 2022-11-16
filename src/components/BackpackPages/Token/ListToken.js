import React, { useRef, useState } from "react";
import { useAxios } from "@/utils/axiosInstance";
import { useMediaQuery } from "react-responsive";
import useUser from "@/hooks/useUser";
import bgToken from "@/dist/token.png";
import Image from "next/image";
import { classNames } from "@/utils/constant";
/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  CurrencyDollarIcon,
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/solid";
import ConvertBalanceToToken from "./ConvertBalanceToToken";
import ActivityToken from "./ActivityToken";
import ConvertTokenToBalance from "./ConvertTokenToBalance";
const ListToken = ({ TabsComponent }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { currentUser } = useUser();
  const [openConvertToToken, setOpenConvertToToken] = useState(false);
  const [openConvertToBalance, setOpenConvertToBalance] = useState(false);

  const stats = [
    {
      id: 1,
      name: "My Balance",
      stat: "$" + parseFloat(currentUser?.profile.balance).toFixed(2),
      icon: CurrencyDollarIcon,
      usd: true,
      btn: (
        <>
          <div className="font-medium bg-indigo-600 w-max rounded-full px-4 cursor-pointer text-white hover:bg-indigo-700">
            {" "}
            Withdraw
          </div>
        </>
      ),
    },
    {
      id: 2,
      name: "My Token",
      stat: parseFloat(currentUser?.profile.token).toFixed(2),
      custom: true,
      btn: (
        <>
          <div className="font-medium cursor-pointer bg-rose-600 w-max rounded-full px-4 text-white hover:bg-rose-700">
            {" "}
            Sell
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <ConvertBalanceToToken
        open={openConvertToToken}
        setOpen={setOpenConvertToToken}
      />
      <ConvertTokenToBalance
        open={openConvertToBalance}
        setOpen={setOpenConvertToBalance}
      />
      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <h1 className="flex-1 text-2xl font-bold text-white">Backpack</h1>
            </div>

            {/* Tabs */}
            {TabsComponent}
            <section className="mt-2">
              <div className="rounded-md bg-yellow-100/75 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Attention needed
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Token & USD Balance is a virtual currency that can be
                        used to buy, sell, and trade Pokemon and Items on
                        Pokechains Marketplace.
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-rose-700">
                      <p>
                        You can withdraw your USD Balance to your wallet
                        address, and minimum withdraw is $10 & your balance must
                        be more than $500.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Currency Profile
                </h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {stats.map((item) => (
                    <div
                      key={item.id}
                      className="relative  bg-gray-800 border border-slate-800 pt-5 px-8 pb-2 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                    >
                      <div className="flex flex-col">
                        <div>
                          <dt>
                            <div className="absolute rounded-md p-2">
                              {item.custom ? (
                                <Image
                                  src={bgToken}
                                  alt="token"
                                  width={40}
                                  height={40}
                                />
                              ) : (
                                <item.icon
                                  className="h-10 w-10 text-white"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                            <p className="ml-16 text-sm font-medium text-white truncate">
                              {item.name}
                            </p>
                          </dt>
                          <dd className="ml-16 pb-6 flex  items-baseline sm:pb-7">
                            <p className="text-2xl font-semibold text-green-600">
                              {item.usd
                                ? item.stat.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })
                                : item.stat}
                            </p>
                          </dd>
                        </div>
                        <div className="-mt-4">
                          <div className="text-sm">{item.btn}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="md:col-span-2 lg:col-span-1 relative bg-gray-800 border border-slate-800 pt-5 px-8 pb-4 sm:pt-4 sm:px-6 shadow rounded-lg overflow-hidden">
                    <div className="flex flex-col space-y-2">
                      <button
                        type="button"
                        onClick={() => setOpenConvertToToken(true)}
                        className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2"
                      >
                        <CurrencyDollarIcon className="mr-2 -ml-1 w-10 h-5 text-white" />
                        Convert Balance to Token
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenConvertToBalance(true)}
                        className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
                      >
                        <div className="mr-2 -ml-1 w-10 h-5">
                          <Image
                            src={bgToken}
                            alt="token"
                            width={23}
                            height={23}
                          />
                        </div>
                        Convert Token to Balance
                      </button>
                    </div>
                  </div>
                </dl>
              </div>
            </section>
            <ActivityToken />
          </div>
        </main>
      </div>
    </>
  );
};

export default ListToken;
