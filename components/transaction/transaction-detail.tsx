"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

interface Transaction {
  hash: string
  height: number
  status: string
  time: string
  gasUsed: string
  gasWanted: string
  fee: string
  memo: string
  events: Array<{
    type: string
    attributes: Array<{
      key: string
      value: string
    }>
  }>
}

export function TransactionDetail({ hash }: { hash: string }) {
  const { data: transaction, isLoading } = useQuery<Transaction>({
    queryKey: ["transaction", hash],
    queryFn: async () => {
      // Fetch transaction details from the Cosmos API
      const baseUrl = 'http://145.223.80.193:1317';
      const response = await fetch(`${baseUrl}/cosmos/tx/v1beta1/txs/${hash}`);
      
      if (!response.ok) {
        throw new Error('Transaction not found');
      }
      
      const data = await response.json();
      const txResponse = data.tx_response;
      const tx = data.tx;
      
      // Extract fee information
      let fee = "0 UCC";
      if (tx?.auth_info?.fee?.amount && tx.auth_info.fee.amount.length > 0) {
        const feeAmount = tx.auth_info.fee.amount[0];
        fee = `${parseInt(feeAmount.amount) / Math.pow(10, 18)} ${feeAmount.denom.replace('a', '')}`;
      }
      
      // Extract memo if present
      const memo = tx?.body?.memo || "";
      
      // Transform events
      const parsedEvents = txResponse.events.map((event: any) => {
        return {
          type: event.type,
          attributes: event.attributes.map((attr: any) => ({
            key: atob(attr.key),
            value: attr.value ? atob(attr.value) : ""
          }))
        };
      });
      
      return {
        hash: txResponse.txhash,
        height: parseInt(txResponse.height),
        status: txResponse.code === 0 ? "Success" : "Failed",
        time: txResponse.timestamp,
        gasUsed: txResponse.gas_used,
        gasWanted: txResponse.gas_wanted,
        fee: fee,
        memo: memo,
        events: parsedEvents
      };
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
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
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Transaction Hash</div>
                <div className="font-mono text-sm break-all">{transaction.hash}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {transaction.status}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Block</div>
                <div>{transaction.height}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Time</div>
                <div>{new Date(transaction.time).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Fee</div>
                <div>{transaction.fee}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Gas (used / wanted)</div>
                <div>{transaction.gasUsed} / {transaction.gasWanted}</div>
              </div>
            </div>
          </div>

          {transaction.memo && (
            <>
              <Separator className="my-4" />
              <div>
                <div className="text-sm text-muted-foreground mb-2">Memo</div>
                <div className="bg-muted p-2 rounded-md text-sm">{transaction.memo}</div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transaction.events.map((event, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="font-medium mb-2">Type: {event.type}</div>
                <div className="bg-muted rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Key</th>
                        <th className="text-left p-2 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.attributes.map((attr, attrIndex) => (
                        <tr key={attrIndex} className="border-b last:border-0">
                          <td className="p-2 font-mono">{attr.key}</td>
                          <td className="p-2 font-mono break-all">{attr.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 