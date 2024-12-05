"use client"

import { useQuery } from "@tanstack/react-query"
import { StatsGrid } from "./stats-grid"
import { TransactionChart } from "./transaction-chart"

export function ChainStats() {
  const { data: stats } = useQuery({
    queryKey: ["chainStats"],
    queryFn: async () => {
      // Implement API call here
      return {
        price: 583.93,
        btcValue: 0.008701,
        priceChange: "+0.39%",
        marketCap: 86504593753.00,
        marketCapBnb: 142142881,
        transactions: 6311.23,
        tps: 42.0,
        gasPrice: 1,
        gasPriceUsd: 0.01,
        latestBlock: 43477480,
        blockTime: 3.0,
        votingPower: 97966371.95,
        chartData: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000),
          value: 2800 + Math.random() * 1600
        }))
      }
    }
  })

  if (!stats) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 shadow-sm border bg-card">
      <div className="lg:col-span-2">
        <StatsGrid stats={stats} />
      </div>
      <div className="lg:col-span-1">
        <TransactionChart data={stats.chartData} />
      </div>
    </div>
  )
}