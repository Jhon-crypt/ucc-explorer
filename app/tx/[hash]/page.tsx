"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { SearchBox } from "@/components/search-box"

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

export default function TransactionPage() {
  const params = useParams()
  const hash = params.hash as string

  const { data: transaction, isLoading } = useQuery<Transaction>({
    queryKey: ["transaction", hash],
    queryFn: async () => {
      // For now, we're returning mock data
      // In a real implementation, you would fetch from an API
      return {
        hash: hash,
        height: 1000,
        status: "Success",
        time: new Date().toISOString(),
        gasUsed: "50000",
        gasWanted: "100000",
        fee: "0.01 UCC",
        memo: "Transaction memo",
        events: [
          {
            type: "transfer",
            attributes: [
              { key: "recipient", value: "ucc1x8m4qr5nqw9lmxu8x9z3f5q9t6z7j8k7l6m5n" },
              { key: "sender", value: "ucc1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s" },
              { key: "amount", value: "100ucc" }
            ]
          }
        ]
      }
    },
  })

  return (
    <div className="container-fluid mx-auto">
      <div className="bg-card w-full py-6 shadow-sm mb-6">
        <div className="w-full md:w-[60%] px-6">
          <SearchBox />
        </div>
      </div>

      <div className="px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : transaction ? (
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
        ) : (
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
        )}
      </div>
    </div>
  )
} 