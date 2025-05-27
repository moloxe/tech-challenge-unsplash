"use client";
import { useEffect } from "react";
import SearchPage from "./_components/SearchPage";
import useSearchBox from "./_hooks/useSearchBox";

export default function Home() {
  const { makeSearch } = useSearchBox();
  useEffect(() => {
    makeSearch();
  }, []);
  return <SearchPage />;
}
