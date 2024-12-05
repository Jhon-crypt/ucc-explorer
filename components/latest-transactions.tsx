"use client"

import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Transaction {
  hash: string
  method: string
  block: string
  age: string
  from: string
  to: string
  amount: string
  fee: string
}

export function LatestTransactions() {
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["latest-transactions"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return Array(6).fill(null).map((_, i) => ({
        hash: "UC4e5ec96f..5fe33d23f",
        method: "Transfer",
        block: "43477480",
        age: new Date(Date.now() - i * 1000 * 60).toISOString(),
        from: "UC4e5ec96f..5fe33d23f",
        to: "UC4e5ec96f..5fe33d23f",
        amount: "0.029937 UCC",
        fee: "0.000063"
      }))
    }
  })

  const columns = [
    {
      header: "Tx Hash",
      accessorKey: "hash" as const,
      cell: (tx: Transaction) => (
        <Link href={`/tx/${tx.hash}`} className="text-blue-500 hover:underline">
          {tx.hash}
        </Link>
      )
    },
    {
      header: "Method",
      accessorKey: "method" as const
    },
    {
      header: "Block",
      accessorKey: "block" as const,
      cell: (tx: Transaction) => (
        <Link href={`/block/${tx.block}`} className="text-blue-500 hover:underline">
          {tx.block}
        </Link>
      )
    },
    {
      header: "Age",
      accessorKey: "age" as const,
      cell: (tx: Transaction) => formatDistanceToNow(new Date(tx.age), { addSuffix: true })
    },
    {
      header: "From",
      accessorKey: "from" as const,
      cell: (tx: Transaction) => (
        <Link href={`/address/${tx.from}`} className="text-blue-500 hover:underline">
          {tx.from}
        </Link>
      )
    },
    {
      header: "To",
      accessorKey: "to" as const,
      cell: (tx: Transaction) => (
        <Link href={`/address/${tx.to}`} className="text-blue-500 hover:underline">
          {tx.to}
        </Link>
      )
    },
    {
      header: "Amount",
      accessorKey: "amount" as const
    },
    {
      header: "Fee",
      accessorKey: "fee" as const
    }
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Latest Transactions</CardTitle>
        <Button variant="link" asChild>
          <Link href="/transactions">View all transactions</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={transactions || []} />
      </CardContent>
    </Card>
  )
}