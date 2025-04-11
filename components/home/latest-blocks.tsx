"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import Link from "next/link";

interface Block {
  height: string;
  validator: string;
  txns: number;
  time: string;
}

export function LatestBlocks() {
  const { data: blocks } = useQuery<Block[]>({
    queryKey: ["latest-blocks"],
    queryFn: async () => {
      // Fetch latest block info from the endpoint
      const response = await fetch('http://145.223.80.193:26657/status');
      const data = await response.json();
      
      // Create a block entry from the latest block info
      const latestBlockTime = new Date(data.result.sync_info.latest_block_time);
      const timeAgo = Math.floor((Date.now() - latestBlockTime.getTime()) / 1000);
      const timeString = timeAgo < 60 ? `${timeAgo} secs ago` : `${Math.floor(timeAgo / 60)} mins ago`;
      
      return [{
        height: data.result.sync_info.latest_block_height,
        validator: data.result.validator_info.address,
        txns: 0, // This information is not available in the status endpoint
        time: timeString,
      }];
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4 border-b">
        <CardTitle className="text-lg font-medium">Latest Blocks</CardTitle>
        <Button variant="outline" size="sm">
          Customize
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blocks?.map((block, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 border-b"
            >
              {/* Block Details */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="rounded-md bg-background p-2">
                  <Box className="h-6 w-6 text-muted" />
                </div>
                <div>
                  <Link
                    href={`/block/${block.height}`}
                    className="text-primary hover:text-blue-600 font-medium"
                  >
                    {block.height}
                  </Link>
                  <div className="text-sm text-muted-foreground opacity-50">
                    {block.time}
                  </div>
                </div>
              </div>

              {/* Validator and Transactions */}
              <div className="text-sm w-full text-muted-foreground w-full md:w-auto">
                <div>
                  <span className="opacity-50">Validated By </span>
                  <Link
                    href={`/address/${block.validator}`}
                    className="text-primary hover:text-blue-600 break-all"
                  >
                    {block.validator}
                  </Link>
                </div>
                <div>
                  <span className="text-primary">{block.txns} </span>
                  <span className="opacity-50">txns in 3 secs</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="w-full mt-4">
          VIEW ALL BLOCKS
        </Button>
      </CardContent>
    </Card>
  );
}