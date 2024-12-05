"use client";
import { SearchBox } from "./search-box";

export function SearchBar() {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-white dark:text-muted-foreground text-lg font-medium">
        Explore Universe chain
      </p>
      <SearchBox />
    </div>
  );
}