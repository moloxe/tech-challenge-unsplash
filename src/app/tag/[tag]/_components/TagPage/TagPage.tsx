"use client";

import SearchPage from "@/app/_components/SearchPage";
import useSearchBox from "@/app/_hooks/useSearchBox";
import { FC, useEffect } from "react";

type Props = {
  tag: string;
};

const TagPage: FC<Props> = ({ tag }) => {
  const { setQuery } = useSearchBox();
  useEffect(() => {
    setQuery(tag);
  }, []);
  return <SearchPage />;
};

export default TagPage;
