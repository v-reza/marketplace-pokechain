import React from "react";
import bgSalesStats from "@/dist/sales-stats.png"
import bgToken from "@/dist/token.png"
import bgPikachu from "@/dist/pikachu.png"
import Image from "next/image";

const OverallStats = () => {
  return (
    <div>
      <div className="relative py-16 sm:py-24 lg:py-20 lg:px-12">
        <div className="relative bg-gray-800 rounded-lg">
          <div className="flex flex-col sm:flex-row md:items-center sm:justify-between text-left mx-auto max-w-md px-4 sm:max-w-4xl sm:px-6 lg:px-8 lg:max-w-full py-8">
            <p className="text-xl sm:text-2xl md:text-2xl font-extrabold text-white tracking-tight">
              Overall Stats
            </p>
            <div className="space-x-2 flex items-center">
              <div className="text-indigo-500 font-bold px-4 py-2 bg-gray-700 hover:bg-gray-700 rounded-md cursor-pointer">
                24H
              </div>
              <div className="text-indigo-500 font-bold px-4 py-2  hover:bg-gray-700 rounded-md cursor-pointer">
                7D
              </div>
              <div className="text-indigo-500 font-bold px-4 py-2  hover:bg-gray-700 rounded-md cursor-pointer">
                30D
              </div>
            </div>
          </div>
          <div className="mt-4 pb-10 mx-auto max-w-md px-4 grid gap-4 sm:max-w-4xl sm:px-6 lg:px-8 sm:grid-cols-2  md:max-w-5xl md:grid-cols-3 lg:grid-cols-3 lg:max-w-full">
            <div className="flex space-x-2">
              <Image
                alt="sales_stats"
                src={bgSalesStats}
                width={40}
                height={40}
              />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-400">
                  Total Sales
                </span>
                <span className="text-md font-extrabold text-white">8.000</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Image alt="sales_stats" src={bgToken} width={40} height={40} />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-400">
                  Total Volume
                </span>
                <span className="text-md font-extrabold text-white">
                  $120.890
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Image
                alt="pokemmon_sold"
                src={bgPikachu}
                width={40}
                height={40}
              />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-400">
                  Pokemons Sold
                </span>
                <span className="text-md font-extrabold text-white">2.220</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStats;
