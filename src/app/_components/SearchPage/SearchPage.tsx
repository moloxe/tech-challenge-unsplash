import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

function SearchPage() {
  return (
    <div className="flex w-full flex-1 p-4 justify-center">
      <main className="flex flex-col w-full max-w-app gap-4">
        <SearchBox />
        <SearchResults />
      </main>
    </div>
  );
}
export default SearchPage;
