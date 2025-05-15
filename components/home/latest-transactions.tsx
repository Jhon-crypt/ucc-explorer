"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchWithCors, REST_API_URL } from "@/lib/api-utils";
import Link from "next/link";

interface Transaction {
  hash: string;
  height: number;
  type: string;
  time: string;
  status: string;
  fee: string;
  from: string;
  to: string;
  amount: string;
}

export function LatestTransactions() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["latestTransactions"],
    queryFn: async () => {
      // Fetch latest transactions with properly formatted event parameter
      const event = encodeURIComponent("tx.height>=1");
      const response = await fetchWithCors(`${REST_API_URL}/cosmos/tx/v1beta1/txs?events=${event}&order_by=ORDER_BY_DESC&limit=10`);
      const data = await response.json();

      if (!data.tx_responses) {
        return [];
      }

      return data.tx_responses.map((tx: any) => {
        // Get the first message from the transaction
        const msg = tx.tx.body.messages[0];
        const msgType = msg["@type"].split(".").pop() || "Unknown";
        
        // Extract fee information
        let fee = "0 UCC";
        if (tx.tx?.auth_info?.fee?.amount && tx.tx.auth_info.fee.amount.length > 0) {
          const feeAmount = tx.tx.auth_info.fee.amount[0];
          fee = `${parseInt(feeAmount.amount) / Math.pow(10, 18)} ${feeAmount.denom.replace('a', '')}`;
        }

        // Extract transfer details for MsgSend
        let from = "", to = "", amount = "";
        if (msgType === "MsgSend") {
          from = msg.from_address;
          to = msg.to_address;
          if (msg.amount && msg.amount.length > 0) {
            const value = parseInt(msg.amount[0].amount) / Math.pow(10, 18);
            amount = `${value} ${msg.amount[0].denom.replace('a', '')}`;
          }
        }

        return {
          hash: tx.txhash,
          height: parseInt(tx.height),
          type: msgType,
          time: new Date(tx.timestamp).toLocaleString(),
          status: tx.code === 0 ? "Success" : "Failed",
          fee,
          from,
          to,
          amount
        };
      });
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions?.map((tx) => (
            <Link 
              key={tx.hash} 
              href={`/tx/${tx.hash}`}
              className="block border rounded-lg p-4 hover:bg-muted transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Tx Hash</div>
                    <div className="font-mono text-sm truncate">{tx.hash}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="text-sm">{tx.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="text-sm">{tx.time}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {tx.from && tx.to && (
                    <>
                      <div>
                        <div className="text-sm text-muted-foreground">From</div>
                        <div className="font-mono text-sm truncate">{tx.from}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">To</div>
                        <div className="font-mono text-sm truncate">{tx.to}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="text-sm">{tx.amount}</div>
                      </div>
                    </>
                  )}
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {tx.status}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}