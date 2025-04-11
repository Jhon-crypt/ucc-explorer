"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  time: string;
}

function formatAmount(amount: string, denom: string): string {
  // Convert from atucc (18 decimals) to UCC
  const value = parseInt(amount) / Math.pow(10, 18);
  return `${value.toFixed(5)} UCC`;
}

function formatTimeAgo(timestamp: string): string {
  const txTime = new Date(timestamp);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - txTime.getTime()) / 1000);
  
  if (diffSeconds < 60) {
    return `${diffSeconds} secs ago`;
  }
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} mins ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} hours ago`;
}

export function LatestTransactions() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["latest-transactions"],
    queryFn: async () => {
      const baseUrl = 'http://145.223.80.193:1317';
      const event = encodeURIComponent("message.action='/cosmos.bank.v1beta1.MsgSend'");
      const response = await fetch(`${baseUrl}/cosmos/tx/v1beta1/txs?events=${event}`);
      const data = await response.json();
      
      return data.tx_responses.map((txResponse: any) => {
        const tx = txResponse.tx;
        const msg = tx.body.messages[0];
        return {
          hash: txResponse.txhash,
          from: msg.from_address,
          to: msg.to_address,
          amount: formatAmount(msg.amount[0].amount, msg.amount[0].denom),
          time: formatTimeAgo(txResponse.timestamp),
        };
      }).slice(0, 6); // Show only last 6 transactions
    },
    refetchInterval: 3000, // Refetch every 3 seconds
    staleTime: 2000, // Consider data stale after 2 seconds
    refetchOnWindowFocus: true,
  });

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4 border-b">
        <CardTitle className="text-lg font-medium">Latest Transactions</CardTitle>
        <Button variant="outline" size="sm">
          Customize
        </Button>
      </CardHeader>
      <CardContent>
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
            transactions?.map((tx, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 border-b"
              >
                {/* Transaction Hash and Time */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="rounded-md bg-background p-2">
                    <FileText className="h-6 w-6 text-muted" />
                  </div>
                  <div>
                    <Link
                      href={`/tx/${tx.hash}`}
                      className="text-primary hover:text-blue-600 font-medium"
                    >
                      {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                    </Link>
                    <div className="text-sm text-muted-foreground opacity-50">
                      {tx.time}
                    </div>
                  </div>
                </div>

                {/* From/To and Amount */}
                <div className="text-sm w-full text-muted-foreground w-full md:w-auto">
                  <div>
                    <span className="opacity-50">From </span>
                    <Link
                      href={`/address/${tx.from}`}
                      className="text-primary hover:text-blue-600"
                    >
                      {tx.from.slice(0, 8)}...{tx.from.slice(-6)}
                    </Link>
                  </div>
                  <div>
                    <span className="opacity-50">To </span>
                    <Link
                      href={`/address/${tx.to}`}
                      className="text-primary hover:text-blue-600"
                    >
                      {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                    </Link>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right border w-fit border-input p-2 rounded-lg">
                  <div className="text-sm font-light">{tx.amount}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <Button variant="ghost" className="w-full mt-4">
          VIEW ALL TRANSACTIONS
        </Button>
      </CardContent>
    </Card>
  );
}