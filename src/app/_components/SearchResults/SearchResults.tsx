"use client";

import useSearchBox from "@/app/_hooks/useSearchBox";
import SearchResult from "./SearchResult";

const SearchResults = () => {
  const { results, query } = useSearchBox();
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
