import React, { useEffect, useRef } from "react";
import bgToken from "@/dist/token.png";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Tooltip } from "flowbite-react";
import { motion } from "framer-motion";
import {
  useQueryClient,
  useQuery,
  useQueries,
  useIsFetching,
} from "react-query";
import { getRecentSales } from "./schema/query";
import { getUserById } from "@/schema/query";
import Pokemon from "./RecentSalesFilter/Pokemon";
import Items from "./RecentSalesFilter/Items";
import moment from "moment";
import Bundles from "./RecentSalesFilter/Bundles";
import Token from "./RecentSalesFilter/Token";
const RecentSales = () => {
  const item = [
    {
      id: 1,
      name: "Pokemon",
    },
    {
      id: 2,
      name: "Items",
    },
    {
      id: 3,
      name: "Bundles",
    },
    {
      id: 4,
      name: "Token",
    },
  ];
  const [filterItem, setFilterItem] = useState(item[0]);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: recentSales,
    error,
  } = useQuery({
    queryKey: ["recentSales", filterItem.name.toLowerCase()],
    queryFn: () => getRecentSales(filterItem.name.toLowerCase()),
  });

  const getFilterComponent = (item) => {
    if (filterItem.name === "Pokemon") {
      return <Pokemon item={item} />;
    } else if (filterItem.name === "Items") {
      return <Items item={item} />;
    } else if (filterItem.name === "Bundles") {
      return <Bundles item={item} />;
    } else if (filterItem.name === "Token") {
      return <Token item={item} />;
    }
  };

  const scrollRecentSales = useRef();
  const [btnScrollRecentSalesLeft, setBtnScrollRecentSalesLeft] =
    useState(false);
  const [btnScrollRecentSalesRight, setBtnScrollRecentSalesRight] =
    useState(true);

  const scroll = (scrollOfset, active) => {
    scrollRecentSales.current.scrollLeft += scrollOfset;
    const maxScrollRight = 300;
    const maxScrollLeft =
      scrollRecentSales.current.scrollWidth -
      scrollRecentSales.current.clientWidth -
      maxScrollRight;
    if (scrollRecentSales.current.scrollLeft >= maxScrollLeft) {
      setBtnScrollRecentSalesRight(false);
    }
    if (scrollRecentSales.current.scrollLeft <= maxScrollRight) {
      setBtnScrollRecentSalesLeft(false);
    }
    if (scrollRecentSales.current.scrollLeft < maxScrollLeft) {
      setBtnScrollRecentSalesRight(true);
    }
    if (scrollRecentSales.current.scrollLeft > maxScrollRight) {
      setBtnScrollRecentSalesLeft(true);
    }
    if (active === "activeLeft") {
      setBtnScrollRecentSalesLeft(true);
    } else if (active === "activeRight") {
      setBtnScrollRecentSalesRight(true);
    }
  };
  return (
    <div>
      <div className="relative lg:px-12 pb-16 sm:pb-24 lg:pb-20">
        <div className="relative bg-gray-800 rounded-lg">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between text-left mx-auto max-w-md px-4 sm:max-w-4xl sm:px-6 lg:px-8 lg:max-w-full py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
              <div className="flex items-center justify-between">
                <div className="text-xl sm:text-2xl md:text-2xl font-extrabold text-white tracking-tight">
                  Recent sales
                </div>
              </div>
              <div
                className="space-x-2 flex items-center overflow-x-auto mt-1"
                id="scroll_item_topSales"
              >
                {item.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setFilterItem(item)}
                    className={`text-indigo-500 text-sm font-bold px-4 py-2 ${
                      item.name === filterItem.name && "bg-gray-700"
                    } hover:bg-gray-700 rounded-md cursor-pointer`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 pb-16  max-w-md px-4 sm:max-w-4xl sm:px-6 lg:px-8 md:max-w-5xl lg:max-w-full relative">
            <div
              className={`w-full space-x-4 pb-6 pt-4 flex items-center ${recentSales.results>0?'':'justify-center'} overflow-x-auto lg:overflow-x-hidden`}
              id="scroll_item_topSales"
              ref={scrollRecentSales}
            >
              {btnScrollRecentSalesLeft && !isLoading && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 z-20 left-0 mx-auto cursor-pointer"
                  onClick={() => scroll(-300, "activeRight")}
                >
                  <div className={`${recentSales.results>0?'':'hidden'} ml-4 mt-32 p-2 bg-gray-700 hover:bg-gray-600 rounded-md`}>
                    <ArrowLeftIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              {btnScrollRecentSalesRight && !isLoading && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 z-20 right-0 mx-auto cursor-pointer"
                  onClick={() => scroll(300, "activeLeft")}
                >
                  <div className={`${recentSales.results>0?'':'hidden'} mr-4 mt-32 p-2 bg-gray-700 hover:bg-gray-600 rounded-md`}>
                    <ArrowRightIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              {!isLoading
                ? recentSales.results>0? recentSales.results.map((item, index) => (
                    <div
                      className="flex flex-col items-start space-y-2"
                      key={item.id}
                    >
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        className="shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-gray-700 border border-slate-600  hover:border-slate-500 cursor-pointer"
                      >
                        {getFilterComponent(item)}
                      </motion.div>
                      <span className="px-2 text-slate-400 text-xs font-extrabold">
                        {moment(item.created_at).fromNow()}
                      </span>
                    </div>
                  )):(
                    <div className="text-white">Data Not Found</div>
                  )
                : new Array(9).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="h-56 w-56 animate-pulse bg-gray-700 rounded-lg" />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;
