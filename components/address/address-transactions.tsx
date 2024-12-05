"use client"

import { Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AddressTransactionsProps {
  address: string
}

export function AddressTransactions({ address }: AddressTransactionsProps) {
  const transactions = Array(10).fill({
    hash: "UC4e5acf96..5fe33d23f",
    method: "Transfer",
    block: "43477480",
    age: "421 days ago",
    from: "UC4e5acf96..5fe33d23f",
    to: "UC4e5acf96..5fe33d23f",
    value: "0.029937",
    txnFee: "0.000063"
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          Latest 23 from a total of 23 transactions
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Page Data
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction Hash</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Block</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Txn Fee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <Button variant="link" className="p-0 h-auto font-normal">
                  {tx.hash}
                </Button>
              </TableCell>
              <TableCell>{tx.method}</TableCell>
              <TableCell>
                <Button variant="link" className="p-0 h-auto font-normal">
                  {tx.block}
                </Button>
              </TableCell>
              <TableCell>{tx.age}</TableCell>
              <TableCell>
                <Button variant="link" className="p-0 h-auto font-normal">
                  {tx.from}
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="link" className="p-0 h-auto font-normal">
                  {tx.to}
                </Button>
              </TableCell>
              <TableCell>{tx.value} UCC</TableCell>
              <TableCell>{tx.txnFee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}