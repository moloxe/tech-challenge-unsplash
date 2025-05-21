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
  setQuery: () => {},
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
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (pathname === "/") {
      setQuery("");
    }
  }, [pathname]);

  useEffect(() => {
    if (isFirstLoadRef.current) {
      const newBatch: SearchBoxBatch = {
        page: batches.length + 1,
        state: "loading",
      };
      setBatches([newBatch]);
    } else {
      setBatches([]);
    }
  }, [query]);

  function loadNextPage() {
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
        setQuery,
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
