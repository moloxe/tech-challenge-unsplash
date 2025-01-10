"use client";

import { createContext, FC, useContext, useEffect, useState } from "react";
import { SearchBoxResult, SearchBox } from "../_types/search-box";
import UnsplashService from "../_services/UnsplashService/UnsplashService";

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

  useEffect(() => {
    async function loadTrendingImages() {
      try {
        const newResults = await UnsplashService.getTrendingPhotos();
        setResults(newResults);
        setError("");
      } catch (error) {
        setError(`Error: ${String(error)}`);
      } finally {
        setLoading(false);
      }
    }
    loadTrendingImages();
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
