"use client";

import useSearchBox from "@/app/_hooks/useSearchBox";
import SearchResult from "./SearchResult";
import { useEffect, useRef, useState } from "react";

const SearchResults = () => {
  const { results, query, loading, error, loadNextPage } = useSearchBox();
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    console.log("isLoadingNextPage", isLoadingNextPage);
    if (!loading && isLoadingNextPage) {
      console.log("scrolling to", scrollY);
      window.scrollTo(0, scrollY);
      setIsLoadingNextPage(false);
    }
  }, [isLoadingNextPage, loading]);

  function handleLoadResults() {
    setScrollY(window.scrollY);
    console.log("scrollY", window.scrollY);
    loadNextPage();
    setIsLoadingNextPage(true);
  }

  // const infiniteScrollRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // if (isFirstRender) {
  //   //   setIsFirstRender(false);
  //   //   return;
  //   // }
  //   let observer: any;
  //   setTimeout(() => {
  //     const options = {
  //       root: document.querySelector("#infiniteScrollRef"),
  //       rootMargin: "0px",
  //       threshold: 0.1,
  //     };

  //     observer = new IntersectionObserver(() => {
  //       console.log("Intersection observed");
  //       loadNextPage();
  //     }, options);
  //   });
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  // if (loading)
  //   return (
  //     <div
  //       className="relative flex-1 overflow-hidden mb-[-1rem]"
  //       aria-label="Loading"
  //     >
  //       <span className="sr-only">Loading</span>
  //       <div className="absolute flex flex-col gap-4">
  //         <div className="animate-pulse flex w-[600px] h-[400px] bg-gray-300 rounded-lg" />
  //         <div className="animate-pulse flex w-[600px] h-[200px] bg-gray-300 rounded-lg" />
  //         <div className="animate-pulse flex w-[600px] h-[500px] bg-gray-300 rounded-lg" />
  //       </div>
  //     </div>
  //   );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="label-app" aria-label="Results">
        {Boolean(query) ? "Results" : "Trending Photos Right Now"}
      </div>
      <div className="flex flex-col gap-4">
        {results.length === 0 && (
          <div className="text-gray-500" aria-label="No results found">
            No results found for <span className="font-semibold">{query}</span>
          </div>
        )}
        {results.map((result) => (
          <SearchResult result={result} key={result.id} />
        ))}
        {results.length > 0 && (
          <button onClick={handleLoadResults} className="button-app">
            Load results
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
