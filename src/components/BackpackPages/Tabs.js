import React from "react";
import { classNames } from "@/utils/constant";

const Tabs = ({ setTabs, listTabs, tabs }) => {
  return (
    <div>
      <div className="mt-3 sm:mt-2">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-slate-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue="My Pokemon"
            value={tabs.name}
            onChange={(e) => {
              setTabs(listTabs.find((tab) => tab.name === e.target.value));
            }}
          >
            {listTabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center border-b border-slate-800">
            <nav
              className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
              aria-label="Tabs"
            >
              {listTabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setTabs(tab)}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.name === tabs.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
