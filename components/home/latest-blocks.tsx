"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Info } from "lucide-react";
import Link from "next/link";
import { User, Clock } from "lucide-react";
import { fetchWithCors, REST_API_URL, RPC_API_URL } from "@/lib/api-utils";

interface Block {
  height: string;
  validator: string;
  txns: number;
  time: string;
}

interface NodeInfo {
  moniker: string;
  network: string;
  version: string;
  appName: string;
  appVersion: string;
}

export function LatestBlocks() {
  // Fetch node info
  const { data: nodeInfo } = useQuery<NodeInfo>({
    queryKey: ["node-info"],
    queryFn: async () => {
      const response = await fetchWithCors(`${REST_API_URL}/cosmos/base/tendermint/v1beta1/node_info`);
      const data = await response.json();
      return {
        moniker: data.default_node_info.moniker,
        network: data.default_node_info.network,
        version: data.default_node_info.version,
        appName: data.application_version.name,
        appVersion: data.application_version.version,
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes since this rarely changes
  });

  const { data: blocks, isLoading } = useQuery<Block[]>({
    queryKey: ["latest-blocks"],
    queryFn: async () => {
      // Fetch latest block info from the endpoint
      const response = await fetchWithCors(`${RPC_API_URL}/status`);
      const data = await response.json();
      
      const latestHeight = parseInt(data.result.sync_info.latest_block_height);
      const blockPromises = [];
      
      // Fetch last 6 blocks
      for (let i = 0; i < 6; i++) {
        const height = latestHeight - i;
        const promise = fetchWithCors(`${RPC_API_URL}/block?height=${height}`)
          .then(res => res.json())
          .then(blockData => {
            const blockTime = new Date(blockData.result.block.header.time);
            const now = new Date();
            const timeAgo = Math.floor((now.getTime() - blockTime.getTime()) / 1000);
            let timeString;
            if (timeAgo < 60) {
              timeString = `${timeAgo} secs ago`;
            } else if (timeAgo < 3600) {
              const mins = Math.floor(timeAgo / 60);
              timeString = `${mins} min${mins > 1 ? 's' : ''} ago`;
            } else {
              const hours = Math.floor(timeAgo / 3600);
              timeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
            }
            
            return {
              height: height.toString(),
              validator: blockData.result.block.header.proposer_address,
              txns: blockData.result.block.data.txs ? blockData.result.block.data.txs.length : 0,
              time: timeString,
            };
          });
        blockPromises.push(promise);
      }
      
      return Promise.all(blockPromises);
    },
    refetchInterval: 1000, // Refetch every second for more real-time updates
    staleTime: 0, // Consider data stale immediately to ensure fresh data
    refetchOnWindowFocus: true,
  });

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col space-y-2 pb-4 border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CardTitle className="text-lg font-medium">Latest Blocks</CardTitle>
        </div>
        {nodeInfo && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span className="font-medium">{nodeInfo.appName} v{nodeInfo.appVersion}</span>
            <span>•</span>
            <span>{nodeInfo.moniker}</span>
            <span>•</span>
            <span>{nodeInfo.network}</span>
            <span>•</span>
            <span>Node v{nodeInfo.version}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="overflow-auto h-[480px]">
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeleton
            Array(6).fill(null).map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 border-b animate-pulse"
              >
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="rounded-md bg-gray-200 p-2 w-10 h-10" />
                  <div>
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-16 bg-gray-200 rounded mt-2" />
                  </div>
                </div>
                <div className="text-sm w-full text-muted-foreground w-full md:w-auto">
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded mt-2" />
                </div>
              </div>
            ))
          ) : (
            blocks?.map((block, i) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}