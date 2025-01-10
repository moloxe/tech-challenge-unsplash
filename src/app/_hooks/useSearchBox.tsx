"use client";

import { createContext, FC, useContext, useEffect, useState } from "react";
import { SearchBoxResult, SearchBox } from "../_types/search-box";
import UnsplashService from "../_services/UnsplashService/UnsplashService";
import { usePathname } from "next/navigation";

const SearchBoxContext = createContext<SearchBox>({
  loading: true,
  query: "",
  results: [],
  setQuery: () => {},
  error: "",
});

export const SearchBoxProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchBoxResult[]>([]);
  const [error, setError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setQuery("");
    }
  }, [pathname]);

  useEffect(() => {
    async function loadImages() {
      try {
        if (query.length) {
          const newResults = await UnsplashService.getPhotosByQuery(query);
          setResults(newResults);
        } else {
          const newResults = await UnsplashService.getTrendingPhotos();
          setResults(newResults);
        }
        setError("");
      } catch (error) {
        setError(`Error: ${String(error)}`);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, [query]);

  return (
    <SearchBoxContext.Provider
      value={{
        loading,
        query,
        results,
        setQuery,
        error,
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
