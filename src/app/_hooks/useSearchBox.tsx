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
  loadNextPage: () => {},
});

export const SearchBoxProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
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
    setResults([]);
  }, [query]);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        if (query.length > 0) {
          const newResults = await UnsplashService.getPhotosByQuery(
            query,
            page
          );
          if (page === 1) setResults(newResults);
          else setResults((prevResults) => [...prevResults, ...newResults]);
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
  }, [query, page]);

  function loadNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <SearchBoxContext.Provider
      value={{
        loading,
        query,
        results,
        setQuery,
        error,
        loadNextPage,
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
