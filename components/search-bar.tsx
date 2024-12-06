"use client";
import { SearchBox } from "./search-box";

export function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-8 bg-black px-4 py-12 min-h-32 pb-20">
      <div className="w-full flex flex-col gap-3">
        <p className="text-white dark:text-muted-foreground text-lg font-medium">
          Explore Universe chain
        </p>
        <SearchBox />
      </div>
      <div className="text-center bg-white mx-auto w-full md:w-[40%] rounded-md p-2 flex items-center justify-center text-black">Ads</div>
    </div>
  );
}