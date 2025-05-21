"use client";

import useSearchBox from "@/app/_hooks/useSearchBox";
import SearchBatch from "./SearchBatch";
import { useEffect, useMemo, useRef, useState } from "react";

const SearchResults = () => {
  const { batches, query, loadNextPage } = useSearchBox();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);
  const isLoadingNextPage = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const someBatchLoading = useMemo(() => {
    return batches.some((batch) => batch.state === "loading");
  }, [batches]);

  const someBatchError = useMemo(() => {
    return batches.some((batch) => batch.state === "error");
  }, [batches]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (query === "") return;
    if (observerRef.current !== null) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      },
      { rootMargin: "100px" }
    );

    if (infiniteScrollRef.current) {
      observerRef.current.observe(infiniteScrollRef.current);
    }
  }, [query]);

  useEffect(() => {
    if (isIntersecting) {
      if (isLoadingNextPage.current) return;
      isLoadingNextPage.current = true;

      const scrollBefore = window.scrollY;
      if (!someBatchLoading) loadNextPage();

      window.scrollTo(0, scrollBefore);

      isLoadingNextPage.current = false;
    }
  }, [someBatchLoading, isIntersecting]);

  return (
    <div className="flex flex-col gap-4">
      <div className="label-app" aria-label="Results">
        {Boolean(query) ? "Results" : "Trending Photos Right Now"}
      </div>
      <div className="flex flex-col gap-4 relative">
        {!someBatchLoading && batches.length === 0 && (
          <div className="text-gray-500" aria-label="No results found">
            No results found for <span className="font-semibold">{query}</span>
          </div>
        )}
        {batches.map((batch, index) => (
          <SearchBatch batch={batch} key={`${query}-${batch.page}-${index}`} />
        ))}
        {!someBatchError && (
          <div
            ref={infiniteScrollRef}
            className="relative flex-1 w-full h-[720px] "
            aria-label="Loading"
          >
            <span className="sr-only">Loading</span>
            <div className="flex flex-col gap-4 w-full">
              <div className="animate-pulse flex w-full max-w-[600px] h-[150px] bg-gray-300 rounded-lg" />
              <div className="animate-pulse flex w-full max-w-[600px] h-[200px] bg-gray-300 rounded-lg" />
              <div className="animate-pulse flex w-full max-w-[600px] h-[400px] bg-gray-300 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
