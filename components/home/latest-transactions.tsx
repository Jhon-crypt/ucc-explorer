"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchWithCors, REST_API_URL } from "@/lib/api-utils";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  time: string;
}

// Helper function to format amounts with proper denomination
function formatAmount(amount: string, denom: string) {
  const value = parseInt(amount) / Math.pow(10, 18); // Assuming 18 decimals
  return `${value.toFixed(6)} ${denom.replace('a', '')}`;
}

// Helper function to format times as "X time ago"
function formatTimeAgo(timestamp: string) {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

// Helper to format hash for display
function formatHash(hash: string) {
  if (!hash) return '';
  return hash.length > 10 ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : hash;
}

// Helper to format address for display
function formatAddress(address: string) {
  if (!address) return '';
  return address.length > 15 ? `${address.slice(0, 8)}...${address.slice(-4)}` : address;
}

export function LatestTransactions() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["latest-transactions"],
    queryFn: async () => {
      const event = encodeURIComponent("message.action='/cosmos.bank.v1beta1.MsgSend'");
      const response = await fetchWithCors(`${REST_API_URL}/cosmos/tx/v1beta1/txs?events=${event}`);
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
    <Card className="h-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4 border-b">
        <CardTitle className="text-lg font-medium">Latest Transactions</CardTitle>
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
            transactions?.map((tx, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 border-b"
              >
                {/* Transaction Hash and Time */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="rounded-md bg-background p-2">
                    <ArrowRight className="h-6 w-6 text-muted" />
                  </div>
                  <div>
                    <Link
                      href={`/tx/${tx.hash}`}
                      className="text-primary hover:text-blue-600 font-medium"
                    >
                      {formatHash(tx.hash)}
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
                      {formatAddress(tx.from)}
                    </Link>
                  </div>
                  <div>
                    <span className="opacity-50">To </span>
                    <Link
                      href={`/address/${tx.to}`}
                      className="text-primary hover:text-blue-600"
                    >
                      {formatAddress(tx.to)}
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
      </CardContent>
    </Card>
  );
}