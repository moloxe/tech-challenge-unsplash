"use client";

import SearchPage from "@/app/_components/SearchPage";
import useSearchBox from "@/app/_hooks/useSearchBox";
import { FC, useEffect } from "react";

type Props = {
  tag: string;
};

const TagPage: FC<Props> = ({ tag }) => {
  const { makeSearch } = useSearchBox();
  useEffect(() => {
    makeSearch(tag);
  }, []);
  return <SearchPage />;
};

export default TagPage;
