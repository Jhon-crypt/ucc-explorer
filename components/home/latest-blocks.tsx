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
  reward: string;
}

export function LatestBlocks() {
  const { data: blocks } = useQuery<Block[]>({
    queryKey: ["latest-blocks"],
    queryFn: async () => {
      // Mock data - Will be replaced with actual API call
      return Array(6)
        .fill(null)
        .map((_, i) => ({
          height: "43477480",
          validator: "0x123456789abcdef",
          txns: 118,
          time: "5 secs ago",
          reward: "0.01189 UCC",
        }));
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
                <div className="rounded-md bg-border p-2">
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

              {/* Reward */}
              <div className="text-right border w-fit border-input p-2 rounded-lg w-fit">
                <div className="text-sm w-fit font-light">{block.reward}</div>
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