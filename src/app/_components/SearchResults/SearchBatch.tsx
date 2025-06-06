import useSearchBox from "@/app/_hooks/useSearchBox";
import UnsplashService from "@/app/_services/UnsplashService/UnsplashService";
import { SearchBoxBatch, SearchBoxResult } from "@/app/_types/search-box";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

type Props = {
  batch: SearchBoxBatch;
};

const CONTAINER_SIZE = "w-full max-w-[600px] min-h-[300px]";

const SearchBatch: FC<Props> = ({ batch }) => {
  const { query, setBatchState } = useSearchBox();
  const [results, setResults] = useState<SearchBoxResult[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadImages() {
      const { page, state } = batch;
      if (state !== "loading") return;
      try {
        setBatchState(page, "loading");
        if (query.length > 0) {
          const newResults = await UnsplashService.getPhotosByQuery(
            query,
            page
          );
          setResults(newResults);
        } else {
          const newResults = await UnsplashService.getTrendingPhotos();
          setResults(newResults);
        }
        setBatchState(page, "success");
        setError("");
      } catch (error) {
        setError(`Error: ${String(error)}`);
        setBatchState(page, "error");
      }
    }
    loadImages();
  }, []);

  return (
    <>
      {!error &&
        results.map((result) => (
          <div
            className={`flex flex-col relative ${CONTAINER_SIZE}`}
            key={result.id}
          >
            <img
              loading="lazy"
              src={result.imageUrl}
              alt={`Photo taken by ${result.author}`}
              className={`${CONTAINER_SIZE} object-cover`}
            />
            <div className="absolute flex bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">
              <div className="flex-1 min-w-[160px] mt-auto">
                <p>
                  <span className="opacity-80">by </span>
                  <span className="font-bold">{result.author}</span>
                </p>
                <p className="opacity-80">Taken on {result.takenDate}</p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {result.tags.map((tag) => (
                  <Link
                    key={tag}
                    className="rounded-md text-sm border p-2 hover:bg-black hover:bg-opacity-50"
                    href={`/tag/${tag}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default SearchBatch;
