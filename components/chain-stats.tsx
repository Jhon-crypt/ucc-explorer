"use client"

import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

export function ChainStats() {
  const { data: stats } = useQuery({
    queryKey: ["chainStats"],
    queryFn: async () => {
      // Mocked API response for demonstration
      return {
        price: 583.93,
        btcValue: 0.008701, // BTC equivalent
        priceChange: "+0.39%",
        marketCap: 86504593753.0,
        marketCapBnb: 142142881, // In BNB
        transactions: 6311230, // Total transactions
        tps: 42.0, // Transactions per second
        gasPrice: 1, // Gwei
        gasPriceUSD: 0.01, // USD equivalent
        latestBlock: 43477480,
        blockTime: 3.0, // seconds
        votingPower: 97966371.95, // BNB
        transactionHistory: [2800, 3200, 4000, 4400, 3000, 3500], // Example chart data
      }
    },
  })

  return (
    <div className="flex w-full items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-[80%]">
      {/* UCC Price */}
        <div className="text-sm text-muted-foreground bg-card">UCC PRICE</div>
        <div className="text-xl font-bold">
          ${stats?.price.toFixed(2)} @ {stats?.btcValue.toFixed(6)} BTC
        </div>
        <div className="text-green-500 text-sm mt-1">{stats?.priceChange}</div>


        {/* UCC Market Cap */}
        <div className="text-sm text-muted-foreground">UCC MARKET CAP ON UCC</div>
        <div className="text-xl font-bold">
          ${formatNumber(stats?.marketCap)}
        </div>
        <div className="text-sm mt-1">({formatNumber(stats?.marketCapBnb)} BNB)</div>

        {/* Transactions */}
        <div className="text-sm text-muted-foreground">TRANSACTIONS</div>
        <div className="text-xl font-bold">
          {formatNumber(stats?.transactions)}M ({stats?.tps.toFixed(1)} TPS)
        </div>

        {/* Gas Price */}
        <div className="text-sm text-muted-foreground">MED GAS PRICE</div>
        <div className="text-xl font-bold">{stats?.gasPrice} Gwei</div>
        <div className="text-sm mt-1">(${stats?.gasPriceUSD})</div>

        {/* Latest Block */}
        <div className="text-sm text-muted-foreground">LATEST BLOCK</div>
        <div className="text-xl font-bold">{stats?.latestBlock}</div>
        <div className="text-sm mt-1">({stats?.blockTime}s)</div>

        {/* Voting Power */}
        <div className="text-sm text-muted-foreground">VOTING POWER</div>
        <div className="text-xl font-bold">
          {formatNumber(stats?.votingPower)} BNB
        </div>

        {/* Transaction History Chart */}
        <div className="text-sm text-muted-foreground">
          UCC SMART CHAIN TRANSACTION HISTORY IN 14 DAYS
        </div>
        <div className="h-24 mt-4">
          {/* Replace with an actual chart component */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
            <polyline
              fill="none"
              stroke="#000"
              strokeWidth="2"
              points="0,40 10,35 20,30 30,25 40,30 50,35 60,20 70,25 80,30 90,20 100,40"
            />
          </svg>
        </div>
    </div>
    </div>
    
  )
}
