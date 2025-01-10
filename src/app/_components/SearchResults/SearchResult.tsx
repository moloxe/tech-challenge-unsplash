import { SearchBoxResult } from "@/app/_types/search-box";
import Link from "next/link";
import { FC } from "react";

type Props = {
  result: SearchBoxResult;
};

const CONTAINER_SIZE = "w-full max-w-[500px] min-h-[200px]";

const SearchResult: FC<Props> = ({ result }) => {
  return (
    <div className={`flex flex-col relative ${CONTAINER_SIZE}`}>
      <img
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
          <p className="opacity-80">Taken {result.takenDate}</p>
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
  );
};

export default SearchResult;
