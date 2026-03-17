"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
  }, [searchQuery, router, searchParams, pathname]);
  return (
    <div className="search-shell">
      <Image
        src="/icons/search.svg"
        alt="search"
        width={15}
        height={15}
        className="opacity-70"
      />
      <input
        placeholder="Search Companions"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
