"use client";

import useSearchBox from "@/app/_hooks/useSearchBox";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBox = () => {
  const { query, setQuery } = useSearchBox();
  const [queryInput, setQueryInput] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuery(queryInput);
    if (pathname !== "/") router.push("/");
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="label-app" htmlFor="search-box-input">
        Search by tag
      </label>

      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          id="search-box-input"
          className="flex-1 input-app"
          type="text"
          placeholder="Search..."
        />
        <button className="button-app" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
