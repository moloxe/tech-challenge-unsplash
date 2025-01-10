export type SearchBoxResult = {
  id: string;
  author: string;
  takenDate: string;
  categories: string[];
  imageUrl: string;
};

export type SearchBox = {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  results: SearchBoxResult[];
  error: string;
};
