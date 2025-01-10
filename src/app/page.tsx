import SearchBox from "./_components/SearchBox";
import SearchResults from "./_components/SearchResults";

export default function Home() {
  return (
    <div className="flex w-full flex-1 p-4 justify-center">
      <main className="flex flex-col w-full max-w-app gap-4">
        <SearchBox />
        <SearchResults />
      </main>
    </div>
  );
}
