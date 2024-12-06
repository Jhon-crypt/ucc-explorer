"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"

interface Transaction {
  hash: string
  from: string
  to: string
  time: string
  value: string
}

export function LatestTransactions() {
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["latest-transactions"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return Array(6).fill(null).map((_, i) => ({
        hash: "43477480",
        from: "UC4e5acf96..5fe33d23f",
        to: "UC00000000...000000000",
        time: "5 secs ago",
        value: "0.01189 UCC"
      }))
    }
  })

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 space-y-2 sm:space-y-0">
        <CardTitle className="text-xl font-bold">Latest Transactions</CardTitle>
        <Button variant="outline" size="sm">Customize</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions?.map((tx, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 justify-between py-3 border-b"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-border p-2">
                  <FileText className="h-6 w-6 text-muted" />
                </div>
                <div>
                  <Link
                    href={`/tx/${tx.hash}`}
                    className="text-primary hover:text-blue-600 font-medium"
                  >
                    {tx.hash}
                  </Link>
                  <div className="text-sm text-muted-foreground opacity-50">
                    {tx.time}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground w-full sm:w-auto">
                <span className="opacity-50">From </span>
                <Link
                  href={`/address/${tx.from}`}
                  className="text-primary hover:text-blue-600"
                >
                  {tx.from}
                </Link>
                <div>
                  <span className="opacity-50">To </span>
                  <Link
                    href={`/address/${tx.to}`}
                    className="text-primary hover:text-blue-600"
                  >
                    {tx.to}
                  </Link>
                </div>
              </div>
              <div className="text-right border w-fit sm:w-auto border-input p-2 rounded-lg">
                <div className="text-xs">{tx.value}</div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4">
          VIEW ALL TRANSACTIONS
        </Button>
      </CardContent>
    </Card>
  )
}