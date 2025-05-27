"use client";

import useSearchBox from "@/app/_hooks/useSearchBox";
import SearchBatch from "./SearchBatch";
import { useEffect, useMemo, useRef, useState } from "react";

const SearchResults = () => {
  const { batches, query, loadNextPage: _loadNextPage } = useSearchBox();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);
  const isLoadingNextPage = useRef(false);

  const someBatchLoading = useMemo(() => {
    return batches.some((batch) => batch.state === "loading");
  }, [batches]);

  const someBatchError = useMemo(() => {
    return batches.some((batch) => batch.state === "error");
  }, [batches]);

  useEffect(() => {
    if (!infiniteScrollRef.current) return;
    const currentRef = infiniteScrollRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "24px" }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  const loadNextPage = useRef(() => {});
  useEffect(() => {
    if (someBatchLoading) loadNextPage.current = () => {};
    else loadNextPage.current = _loadNextPage;
  }, [someBatchLoading]);

  useEffect(() => {
    if (isIntersecting) {
      if (isLoadingNextPage.current) return;

      isLoadingNextPage.current = true;

      const scrollBefore = window.scrollY;
      // TODO: This should be async
      loadNextPage.current();
      window.scrollTo(0, scrollBefore);

      isLoadingNextPage.current = false;
    }
  }, [isIntersecting]);

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
            className="flex-1 w-full h-[720px]"
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
