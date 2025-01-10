"use client";

import useSearchBox from "@/app/_hooks/useSearchBox";
import SearchResult from "./SearchResult";

const SearchResults = () => {
  const { results, query, loading, error } = useSearchBox();

  if (loading)
    return (
      <div className="relative flex-1 overflow-hidden mb-[-1rem]">
        <span className="sr-only">Loading</span>
        <div className="absolute flex flex-col gap-4">
          <div className="animate-pulse flex w-[600px] h-[400px] bg-gray-300 rounded-lg" />
          <div className="animate-pulse flex w-[600px] h-[200px] bg-gray-300 rounded-lg" />
          <div className="animate-pulse flex w-[600px] h-[500px] bg-gray-300 rounded-lg" />
        </div>
      </div>
    );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-4">
      <label className="label-app">
        {Boolean(query) ? "Results" : "Trending Photos Right Now"}
      </label>
      <div className="flex flex-col gap-4">
        {results.map((result) => (
          <SearchResult result={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
