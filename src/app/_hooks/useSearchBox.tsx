"use client";

import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchBox, SearchBoxBatch } from "../_types/search-box";
import { usePathname } from "next/navigation";

const SearchBoxContext = createContext<SearchBox>({
  query: "",
  makeSearch: () => {},
  loadNextPage: () => {},
  batches: [],
  setBatchState: () => {},
});

export const SearchBoxProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [query, setQuery] = useState("");
  const [batches, setBatches] = useState<SearchBoxBatch[]>([]);
  const pathname = usePathname();
  const isFirstSearch = useRef(true);

  useEffect(() => {
    if (pathname === "/") {
      setQuery("");
    }
  }, [pathname]);

  function makeSearch(newQuery?: string) {
    let page = batches.length + 1;
    if (newQuery !== query) {
      page = 1;
    }
    const newBatch: SearchBoxBatch = {
      page,
      state: "loading",
    };
    setBatches([newBatch]);
    if (newQuery) setQuery(newQuery);
    isFirstSearch.current = false;
  }

  function loadNextPage() {
    if (isFirstSearch.current) return;
    setBatches((prev) => [
      ...prev,
      { page: prev.length + 1, state: "loading" },
    ]);
  }

  function setBatchState(page: number, state: SearchBoxBatch["state"]) {
    setBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.page === page ? { ...batch, state } : batch
      )
    );
  }

  return (
    <SearchBoxContext.Provider
      value={{
        query,
        makeSearch,
        loadNextPage,
        batches,
        setBatchState,
      }}
    >
      {children}
    </SearchBoxContext.Provider>
  );
};

const useSearchBox = () => {
  const searchBox = useContext(SearchBoxContext);
  return searchBox;
};

export default useSearchBox;
