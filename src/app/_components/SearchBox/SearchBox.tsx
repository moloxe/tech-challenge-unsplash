const SearchBox = () => {
  return (
    <div className="flex flex-col gap-4">
      <label className="label-app" htmlFor="search-box-input">
        Search by tag
      </label>

      <form className="flex gap-4">
        <input
          id="search-box-input"
          className="flex-1 input-app"
          type="text"
          placeholder="Search..."
        />
        <button className="button-app" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
