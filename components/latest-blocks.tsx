"use client"

import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Block {
  id: string
  height: number
  timestamp: string
  transactions: number
  validator: string
  reward: string
}

export function LatestBlocks() {
  const { data: blocks } = useQuery<Block[]>({
    queryKey: ["latest-blocks"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return Array(6).fill(null).map((_, i) => ({
        id: `43477${480 - i}`,
        height: 43477480 - i,
        timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
        transactions: 118,
        validator: "UC4e5ec96f..5fe33d23f",
        reward: "0.01898 UCC"
      }))
    }
  })

  const columns = [
    {
      header: "Height",
      accessorKey: "height" as const,
      cell: (block: Block) => (
        <Link href={`/block/${block.id}`} className="text-blue-500 hover:underline">
          {block.height}
        </Link>
      )
    },
    {
      header: "Age",
      accessorKey: "timestamp" as const,
      cell: (block: Block) => formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })
    },
    {
      header: "Txn",
      accessorKey: "transactions" as const
    },
    {
      header: "Validator",
      accessorKey: "validator" as const,
      cell: (block: Block) => (
        <Link href={`/address/${block.validator}`} className="text-blue-500 hover:underline">
          {block.validator}
        </Link>
      )
    },
    {
      header: "Reward",
      accessorKey: "reward" as const
    }
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Latest Blocks</CardTitle>
        <Button variant="link" asChild>
          <Link href="/blocks">View all blocks</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={blocks || []} />
      </CardContent>
    </Card>
  )
}