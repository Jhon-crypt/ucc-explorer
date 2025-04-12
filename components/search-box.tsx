"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Transaction {
  hash: string;
  height: number;
  status: string;
  time: string;
  gasUsed?: string;
  gasWanted?: string;
  fee?: string;
}

export function SearchBox() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("Transactions");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Transaction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const filters = ["All filters", "Transactions", "Blocks", "Validators", "Tokens"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowResults(true);
    
    try {
      // For now, we're creating mock transaction data
      // In a real implementation, you would fetch from an API
      if (searchQuery.startsWith("0x") || searchQuery.startsWith("tx")) {
        const mockTransaction: Transaction = {
          hash: searchQuery,
          height: 1000,
          status: "Success",
          time: new Date().toISOString(),
          gasUsed: "50000",
          gasWanted: "100000",
          fee: "0.01 UCC"
        };
        setSearchResults([mockTransaction]);
      } else {
        // If not a tx hash, show empty results
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const viewTransactionDetails = (hash: string) => {
    // Navigate to transaction details page
    router.push(`/tx/${hash}`);
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full bg-yellow-500 rounded-lg shadow-md p-0.5">
        {/* Filter Dropdown */}
        <div className="bg-white relative flex items-center w-full p-1 rounded-lg">
          <div className="relative flex-shrink-0">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-4 py-2 text-xs font-light text-black bg-white rounded-l-md focus:outline-none"
            >
              {selectedFilter} <span>&#9662;</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-40 bg-white shadow-md rounded-md z-10">
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
            placeholder="Search transactions (enter tx hash)"
            className="flex-grow border-none rounded-none bg-white text-black pl-4 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Search Icon */}
          <button 
            className="flex items-center justify-center mr-1 p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
            onClick={handleSearch}
          >
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <Card className="absolute w-full mt-2 z-50 shadow-lg">
          <CardContent className="p-4">
            {isSearching ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Search Results</h3>
                {searchResults.map((tx, index) => (
                  <div 
                    key={index} 
                    className="border-b pb-3 cursor-pointer hover:bg-muted p-2 rounded-md"
                    onClick={() => viewTransactionDetails(tx.hash)}
                  >
                    <div className="flex justify-between">
                      <div className="font-mono text-sm truncate max-w-[70%]">
                        {tx.hash}
                      </div>
                      <div className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                        {tx.status}
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <div>Block: {tx.height}</div>
                      <div>{new Date(tx.time).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No transactions found matching &quot;{searchQuery}&quot;</p>
                <p className="text-xs mt-2">Try searching for a complete transaction hash</p>
              </div>
            )}
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowResults(false)}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}