import { Dispatch, SetStateAction } from "react";

export type SearchBoxResult = {
  id: string;
  author: string;
  takenDate: string;
  tags: string[];
  imageUrl: string;
};

export type SearchBatchState = "loading" | "success" | "error";

export type SearchBoxBatch = {
  page: number;
  state: SearchBatchState;
};

export type SearchBox = {
  query: string;
  results: string[];
  setResults: Dispatch<SetStateAction<string[]>>;
  modalIndex?: number;
  setModalIndex: Dispatch<SetStateAction<number | undefined>>;
  makeSearch: (query?: string) => void;
  setBatchState: (page: number, state: SearchBatchState) => void;
  batches: SearchBoxBatch[];
  loadNextPage: () => void;
};
