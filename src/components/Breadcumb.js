import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Breadcumb = () => {
  const [onHover, setOnHover] = useState(false);
  const router = useRouter();
  const pathname = router.pathname.split("/")[1];

  return (
    <div>
      <div className="px-8 py-7 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onMouseEnter={() => setOnHover(true)}
              onMouseLeave={() => setOnHover(false)}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className={`${onHover ? "text-white" : "text-slate-400"}`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.25A3.75 3.75 0 0 0 8.25 5v1a4 4 0 0 0-3.862 3.263l-1.5 8A4 4 0 0 0 6.82 22h10.36a4 4 0 0 0 3.932-4.737l-1.5-8A4 4 0 0 0 15.75 6V5A3.75 3.75 0 0 0 12 1.25ZM14.25 6V5a2.25 2.25 0 0 0-4.5 0v1h4.5Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span
                className={`text-sm ${
                  onHover ? "text-white" : "text-slate-500"
                }  font-bold`}
              >
                Marketplace
              </span>
            </div>
          </Link>
          <ChevronRightIcon className="h-4 w-4 text-slate-500" />
          <Link href={"/"+pathname}>
            <span className="text-white text-sm font-bold cursor-pointer capitalize">
              {pathname}
            </span>
          </Link>
          {router.query.id && (
            <>
              <ChevronRightIcon className="h-4 w-4 text-slate-500" />
              <Link href={`${router.asPath}`}>
                <span className="text-white text-sm font-bold cursor-pointer capitalize">
                  #{router.query.id}
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcumb;
