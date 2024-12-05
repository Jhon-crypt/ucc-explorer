"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Box } from "lucide-react"
import Link from "next/link"

interface Block {
  height: string
  validator: string
  txns: number
  time: string
  reward: string
}

export function LatestBlocks() {
  const { data: blocks } = useQuery<Block[]>({
    queryKey: ["latest-blocks"],
    queryFn: async () => {
      // Mock data - Will be replaced with actual API call
      return Array(6).fill(null).map((_, i) => ({
        height: "43477480",
        validator: "0x123456789abcdef",
        txns: 118,
        time: "5 secs ago",
        reward: "0.01189 UCC"
      }))
    }
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="text-xl font-medium">Latest Blocks</CardTitle>
        <Button variant="outline" size="sm">Customize</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blocks?.map((block, i) => (
            <div key={i} className="flex items-center gap-8 justify-between py-3 border-b">
              <div className="flex items-center gap-3  ">
                <div className="rounded-md bg-border p-2">
                  <Box className="h-6 w-6 text-muted" />
                </div>
                <div>
                  <Link
                    href={`/block/${block.height}`}
                    className="text-primary hover:text-blue-600 font-medium"
                  >
                    {block.height}
                  </Link>
                  <div className="text-sm text-muted-foreground opacity-50">
                    5 secs ago
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground ">
                <span className="opacity-50">
                  Validated By{" "}
                </span>

                <Link
                  href={`/address/${block.validator}`}
                  className="text-primary hover:text-blue-600"
                >
                  {block.validator}
                </Link>
                <div className="text-sm text-muted-foreground">
                  <span className="text-primary">{block.txns} </span>
                  <span className="opacity-50">
                    txns in 3 secs
                  </span>
                </div>
              </div>
              <div className="text-right border border-input p-2 rounded-lg">
                <div className="text-sm font-light">{block.reward}</div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4 ">
          VIEW ALL BLOCKS
        </Button>
        
      </CardContent>
    </Card>
  )
}