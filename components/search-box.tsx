"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SearchBox() {
  const [selectedFilter, setSelectedFilter] = useState("All filters");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filters = ["All filters", "Transactions", "Blocks", "Programs", "Tokens"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center w-full bg-yellow-500 rounded-lg shadow-md p-2">
      {/* Filter Dropdown */}
      <div className="bg-white relative flex items-center w-full p-1 rounded-lg">
        <div className="relative flex flex-grow w-32">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-4 py-2 text-xs font-light text-black bg-card rounded-l-md focus:outline-none"
          >
            {selectedFilter} <span className="rotate-(-90)">&#9662;</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md z-10">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => selectFilter(filter)}
                  className="w-full px-4 py-2 text-left text-sm text-black hover:bg-yellow-200 focus:outline-none"
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <Input
          placeholder="Search transactions, blocks, programs and tokens"
          className="flex-grow border-none rounded-none bg-white text-black pl-4 py-2 text-sm"
        />

        {/* Search Icon */}
        <button className="flex items-center justify-center mr-1 p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500">
          <Search className="h-5 w-5" />
        </button>
      </div>

    </div>
  );
}