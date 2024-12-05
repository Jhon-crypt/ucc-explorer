"use client"

import { Globe, Clock } from "lucide-react"
import { formatNumber } from "@/lib/utils"

interface StatsGridProps {
  stats: {
    price: number
    btcValue: number
    priceChange: string
    marketCap: number
    marketCapBnb: number
    transactions: number
    tps: number
    gasPrice: number
    gasPriceUsd: number
    latestBlock: number
    blockTime: number
    votingPower: number
  }
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 border-r ">
      {/* UCC Price */}
      <div className="bg-card border-b border-b-grey-200 border-l p-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-muted-foreground opacity-50">UCC PRICE</span>
        </div>
        <div className="mt-2">
          <div className="text-md">
            ${stats.price.toFixed(2)} @ <span className="text-muted-foreground opacity-50 ">{stats.btcValue.toFixed(6)} BTC</span>
          </div>
          <div className="text-sm text-green-500">{stats.priceChange}</div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-card border-b border-b-grey-200 border-l p-4" >
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-muted-foreground opacity-50">TRANSACTIONS</span>
        </div>
        <div className="mt-2">
          <div className="text-md">
            {stats.transactions}M <span className="text-muted-foreground opacity-50">
              ({stats.tps.toFixed(1)} TPS)
            </span>
          </div>
        </div>
      </div>


      {/* Gas Price */}
      <div className="bg-card border-l p-4" >
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-muted-foreground opacity-50">MED GAS PRICE</span>
        </div>
        <div className="mt-2 flex items-center">
          <div className="text-md">{stats.gasPrice} Gwei</div>
          <div className="text-sm text-muted-foreground opacity-50">(${stats.gasPriceUsd})</div>
        </div>
      </div>

      {/* Market Cap */}
      <div className="bg-card border-b border-b-grey-200 border-l p-4" >
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-muted-foreground opacity-50">UCC MARKET CAP ON UCC</span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="text-md">${formatNumber(stats.marketCap)}</div>
          <div className="text-sm text-muted-foreground opacity-50">
            ({formatNumber(stats.marketCapBnb)} BNB)
          </div>
        </div>
      </div>

      {/* Latest Block */}
      <div className="bg-card border-l p-4" >
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-muted-foreground opacity-50">LATEST BLOCK</span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="text-md">{stats.latestBlock}</div>
          <div className="text-sm text-muted-foreground opacity-50">({stats.blockTime}s)</div>
        </div>
      </div>

      {/* Voting Power */}
      <div className="bg-card border-l p-4" >
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-muted-foreground opacity-50">VOTING POWER</span>
        </div>
        <div className="mt-2">
          <div className="text-md">{formatNumber(stats.votingPower)} BNB</div>
        </div>
      </div>
    </div>
  )
}