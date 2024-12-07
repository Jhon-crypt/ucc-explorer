"use client"

import { Globe, Clock, ArrowLeftRight } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import Image from "next/image";

interface StatsGridProps {
  stats: {
    price: number
    btcValue: number
    priceChange: string
    marketCap: number
    marketCapUcc: number
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 border-r  rounded-lg">

      <div className="flex flex-col gap-2">
        {/* UCC Price */}
        <div className="flex justify-start bg-card rounded-t-lg  border-b p-4">
          <div className="h-5 w-5">
            <Image
              src="/images/icon.png"
              alt="UCCASH"
              width={24}
              height={24}
            />
          </div>

          <div className="lg:text-sm text-xs w-full">
            <span className="lg:text-sm text-xs text-muted-foreground opacity-50 ml-1">UCC PRICE</span>
            <div className="flex gap-1 w-full">
              <span className="w-full flex">
                ${stats.price.toFixed(2)} <span className="ml-1"> @ </span><span className="text-muted-foreground opacity-50 ml-1">{stats.btcValue.toFixed(6)}BTC</span>
                <span className="ml-1 text-green-500">{stats.priceChange}</span>
              </span>
              
            </div>
          </div>
        </div>

        {/* Market Cap */}
        <div className="flex gap-2 bg-card border-b  p-4">
          <div className="">
            <Globe className="h-5 w-5 " />

          </div>
          <div className="lg:text-sm text-xs flex flex-col gap-1">
            <div className="text-muted-foreground opacity-50">UCC MARKET CAP ON UCC</div>
            <div className="flex gap-1">${formatNumber(stats.marketCap)}
              <div className="lg:text-sm text-xs text-muted-foreground opacity-50">
                ({formatNumber(stats.marketCapUcc)} UCC)
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className="flex flex-col gap-2 border-l ">
        <div className="flex justify-between border-b">
          {/* Transactions */}
          <div className="flex gap-2 bg-card p-4 lg:text-sm text-xs" >
            <div className="">
              <ArrowLeftRight className="h-5 w-5 " />
            </div>
            <div className="">
              <span className="lg:text-sm text-xs text-muted-foreground opacity-50">TRANSACTIONS</span>
              <div className="text-md">
                {stats.transactions}M <span className="text-muted-foreground opacity-50">
                  ({stats.tps.toFixed(1)} TPS)
                </span>
              </div>
            </div>
          </div>


          {/* Gas Price */}
          <div className="flex justify-end gap-2 bg-card  p-4 lg:text-sm text-xs" >
            <div className="">
              <span className="lg:text-sm text-xs text-muted-foreground opacity-50">MED GAS PRICE</span>
              <div className="flex gap-1">{stats.gasPrice} Gwei
                <span className="lg:text-sm text-xs text-muted-foreground opacity-50">(${stats.gasPriceUsd})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-b">
          {/* Latest Block */}
          <div className="flex gap-2 bg-card p-4">
            <div className="">
              <Clock className="h-5 w-5 " />

            </div>
            <div className="lg:text-sm text-xs flex flex-col gap-1">
              <div className="text-muted-foreground opacity-50">LATEST BLOCK</div>
              <div className="flex gap-1">{stats.latestBlock}
                <div className="lg:text-sm text-xs text-muted-foreground opacity-50">
                  ({stats.blockTime}s)
                </div>
              </div>
            </div>
          </div>

          {/* Voting Power */}
          <div className="flex gap-2 justify-end bg-card  p-4">
            <div className="lg:text-sm text-xs flex flex-col gap-1">
              <div className="text-muted-foreground opacity-50">VOTING POWER</div>
              <div className="flex gap-1">{formatNumber(stats.votingPower)} UCC

              </div>
            </div>
          </div>
        </div>

      </div>







    </div >
  )
}