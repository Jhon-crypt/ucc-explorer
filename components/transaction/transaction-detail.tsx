"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { Loader2, Copy, ExternalLink, CheckCircle2, XCircle } from "lucide-react"
import { fetchWithCors, REST_API_URL } from "@/lib/api-utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface Transaction {
  hash: string
  height: number
  status: string
  time: string
  gasUsed: string
  gasWanted: string
  gasPrice: string
  fee: {
    amount: string
    denom: string
  }
  memo: string
  messages: Array<{
    type: string
    from: string
    to: string
    amount: {
      amount: string
      denom: string
    }
  }>
}

export function TransactionDetail({ hash }: { hash: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 12)}...${address.slice(-8)}`;
  };

  const formatAmount = (amount: string, denom: string) => {
    return `${(parseInt(amount) / Math.pow(10, 18)).toFixed(6)} ${denom.replace('a', '')}`;
  };

  const { data: transaction, isLoading } = useQuery<Transaction>({
    queryKey: ["transaction", hash],
    queryFn: async () => {
      const response = await fetchWithCors(`${REST_API_URL}/cosmos/tx/v1beta1/txs/${hash}`);
      
      if (!response.ok) {
        throw new Error('Transaction not found');
      }
      
      const data = await response.json();
      const txResponse = data.tx_response;
      const tx = data.tx;
      
      // Extract messages
      const messages = tx.body.messages.map((msg: any) => ({
        type: msg["@type"].split(".").pop() || "Unknown",
        from: msg.from_address,
        to: msg.to_address,
        amount: msg.amount?.[0] || { amount: "0", denom: "atucc" }
      }));

      // Calculate gas price
      const gasPrice = (parseInt(txResponse.gas_used) / Math.pow(10, 18)).toFixed(9);
      
      return {
        hash: txResponse.txhash,
        height: parseInt(txResponse.height),
        status: txResponse.code === 0 ? "Success" : "Failed",
        time: txResponse.timestamp,
        gasUsed: txResponse.gas_used,
        gasWanted: txResponse.gas_wanted,
        gasPrice: `${gasPrice} Gwei`,
        fee: tx.auth_info.fee.amount[0],
        memo: tx.body.memo,
        messages
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">Transaction Not Found</h3>
            <p className="text-muted-foreground">
              Could not find transaction with hash {hash}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Transaction Details
            <Badge variant={transaction.status === "Success" ? "default" : "destructive"}>
              {transaction.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col space-y-1.5">
                <div className="text-sm text-muted-foreground">Transaction Hash</div>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-sm">{transaction.hash}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(transaction.hash)}
                  >
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="text-sm text-muted-foreground">Block</div>
                <div className="flex items-center gap-2">
                  <Link href={`/block/${transaction.height}`} className="text-primary hover:underline">
                    {transaction.height}
                  </Link>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="text-sm text-muted-foreground">Timestamp</div>
                <div>{new Date(transaction.time).toLocaleString()}</div>
              </div>
            </div>

            <Separator />

            {transaction.messages.map((msg, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-medium">Transaction Action</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex flex-col space-y-1.5">
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div>{msg.type}</div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <div className="text-sm text-muted-foreground">From</div>
                    <div className="flex items-center gap-2">
                      <Link href={`/address/${msg.from}`} className="font-mono text-primary hover:underline">
                        {formatAddress(msg.from)}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(msg.from)}
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <div className="text-sm text-muted-foreground">To</div>
                    <div className="flex items-center gap-2">
                      <Link href={`/address/${msg.to}`} className="font-mono text-primary hover:underline">
                        {formatAddress(msg.to)}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(msg.to)}
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <div className="text-sm text-muted-foreground">Value</div>
                    <div>{formatAmount(msg.amount.amount, msg.amount.denom)}</div>
                  </div>
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Transaction Fee</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <div className="text-sm text-muted-foreground">Gas Used</div>
                  <div>{transaction.gasUsed} ({((parseInt(transaction.gasUsed) / parseInt(transaction.gasWanted)) * 100).toFixed(2)}%)</div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <div className="text-sm text-muted-foreground">Gas Price</div>
                  <div>{transaction.gasPrice}</div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <div className="text-sm text-muted-foreground">Transaction Fee</div>
                  <div>{formatAmount(transaction.fee.amount, transaction.fee.denom)}</div>
                </div>
              </div>
            </div>

            {transaction.memo && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Memo</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-sm">{transaction.memo}</code>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 