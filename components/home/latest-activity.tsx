"use client"

import { LatestBlocks } from "./latest-blocks"
import { LatestTransactions } from "./latest-transactions"

export function LatestActivity() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <LatestBlocks />
      <LatestTransactions />
    </div>
  )
}