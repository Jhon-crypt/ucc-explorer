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
import { fetchWithCors, REST_API_URL, RPC_API_URL } from "@/lib/api-utils";

interface SearchResult {
  type: 'transaction' | 'block' | 'address';
  hash?: string;
  height?: number;
  status?: string;
  time?: string;
  gasUsed?: string;
  gasWanted?: string;
  fee?: string;
  txCount?: number;
}

export function SearchBox() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All filters");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
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

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    setIsSearching(true);
    setShowResults(true);
    setSearchResults([]);
    
    try {
      const results: SearchResult[] = [];
      
      // Check if search query is a transaction hash
      if ((selectedFilter === "All filters" || selectedFilter === "Transactions") && 
          (searchQuery.length > 40)) {
        try {
          // Try to fetch transaction by hash
          const response = await fetchWithCors(`${REST_API_URL}/cosmos/tx/v1beta1/txs/${searchQuery}`);
          
          if (response.ok) {
            const data = await response.json();
            const txResponse = data.tx_response;
            
            results.push({
              type: 'transaction',
              hash: txResponse.txhash,
              height: parseInt(txResponse.height),
              status: txResponse.code === 0 ? "Success" : "Failed",
              time: txResponse.timestamp,
              gasUsed: txResponse.gas_used,
              gasWanted: txResponse.gas_wanted,
              fee: "0.01 UCC" // Fee info might need to be extracted from tx.auth_info.fee
            });
          }
        } catch (error) {
          console.log("Not a valid transaction hash");
        }
      }
      
      // Check if search query is a block height
      if ((selectedFilter === "All filters" || selectedFilter === "Blocks") && 
          (!isNaN(parseInt(searchQuery)))) {
        try {
          // Try to fetch block by height
          const blockHeight = parseInt(searchQuery);
          const response = await fetchWithCors(`${RPC_API_URL}/block?height=${blockHeight}`);
          
          if (response.ok) {
            const data = await response.json();
            const block = data.result.block;
            
            results.push({
              type: 'block',
              height: blockHeight,
              time: block.header.time,
              txCount: block.data.txs ? block.data.txs.length : 0
            });
          }
        } catch (error) {
          console.log("Not a valid block height");
        }
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const viewSearchResult = (result: SearchResult) => {
    // Navigate to the appropriate page based on result type
    if (result.type === 'transaction' && result.hash) {
      router.push(`/tx/${result.hash}`);
    } else if (result.type === 'block') {
      router.push(`/block/${result.height}`);
    }
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
            placeholder="Search transactions, blocks..."
            className="flex-grow border-none rounded-none bg-white text-black pl-4 py-2 text-sm"
            value={searchQuery}
            onChange={handleQueryChange}
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
                {searchResults.map((result, index) => (
                  <div 
                    key={index} 
                    className="border-b pb-3 cursor-pointer hover:bg-muted p-2 rounded-md"
                    onClick={() => viewSearchResult(result)}
                  >
                    {result.type === 'transaction' ? (
                      <>
                        <div className="flex justify-between">
                          <div className="font-medium text-sm">Transaction</div>
                          <div className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                            {result.status}
                          </div>
                        </div>
                        <div className="font-mono text-sm truncate max-w-[100%] mt-1">
                          {result.hash}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <div className="font-medium text-sm">Block</div>
                          <div className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                            {result.txCount} Txs
                          </div>
                        </div>
                        <div className="font-mono text-sm mt-1">
                          Height: {result.height}
                        </div>
                      </>
                    )}
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <div>{result.type === 'transaction' ? `Block: ${result.height}` : ''}</div>
                      <div>{new Date(result.time).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No results found matching &quot;{searchQuery}&quot;</p>
                <p className="text-xs mt-2">Try searching for a transaction hash or block height</p>
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