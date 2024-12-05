"use client"

import { Download, Filter, Info, X, ExternalLink, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import Image from "next/image"

interface TokenTransfer {
  hash: string
  method: string
  block: string
  age: string
  from: string
  to: string
  amount: string
  token: {
    symbol: string
    name: string
    logo: string
  }
  type: "IN" | "OUT"
}

interface TokenTransfersProps {
  address: string
}

export function TokenTransfers({ address }: TokenTransfersProps) {
  const transfers: TokenTransfer[] = [
    {
      hash: "0xbb7007448f...",
      method: "Transfer",
      block: "30010385",
      age: "507 days ago",
      from: "0xFD8893BA...505Bd90D1",
      to: "0x7f2CA115...ba28237d9",
      amount: "200",
      token: {
        symbol: "S39",
        name: "S39 Token",
        logo: "/token-logos/s39.png"
      },
      type: "IN"
    },
    {
      hash: "0xbb7007448f...",
      method: "Transfer",
      block: "30010385",
      age: "507 days ago",
      from: "0xFD8893BA...505Bd90D1",
      to: "0x7f2CA115...ba28237d9",
      amount: "200",
      token: {
        symbol: "S39",
        name: "S39 Token",
        logo: "/token-logos/s39.png"
      },
      type: "IN"
    }
  ]

  return (
    <div className="space-y-4 border p-3 rounded-lg">
      <Alert  className="bg-input">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm text-muted-foreground flex items-center justify-between">
          <span>
            Transactions involving tokens marked as suspicious, unsafe, spam or brand infringement are currently hidden. To show them, go to{" "}
            <Link href="/settings" className="text-primary hover:underline">
              Site Settings
            </Link>
            .
          </span>
          <Button variant="destructive" size="sm" className="text-muted-foreground h-auto p-0">
            <X className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          <span className="text-sm font-medium">
            Latest 12 BEP-20 Token Transfer Events
          </span>
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

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]"></TableHead>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Token</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map((transfer, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/tx/${transfer.hash}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {transfer.hash}
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {transfer.method}
                  </span>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/block/${transfer.block}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {transfer.block}
                  </Link>
                </TableCell>
                <TableCell>{transfer.age}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/address/${transfer.from}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {transfer.from}
                    </Link>
                    {transfer.type === "OUT" && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">
                        OUT
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/address/${transfer.to}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {transfer.to}
                    </Link>
                    {transfer.type === "IN" && (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                        IN
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{transfer.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={transfer.token.logo}
                      alt={transfer.token.symbol}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span>{transfer.token.symbol}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}