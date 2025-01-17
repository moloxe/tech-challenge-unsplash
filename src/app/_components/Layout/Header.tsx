import Link from "next/link";
import { memo } from "react";

const Header = memo(() => {
  return (
    <header className="flex justify-center bg-neutral-800 p-4">
      <div className="w-full max-w-app">
        <Link
          href={"/"}
          className="text-neutral-300 inline text-xl align-middle"
        >
          Tech <span className="text-white">Challenge</span>
        </Link>{" "}
        <span className="text-neutral-300 inline text-sm align-middle">
          powered by Unsplash
        </span>
      </div>
    </header>
  );
});

Header.displayName = "App Header";

export default Header;
