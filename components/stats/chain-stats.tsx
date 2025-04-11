"use client"

import { useQuery } from "@tanstack/react-query"
import { StatsGrid } from "./stats-grid"
import { TransactionChart } from "./transaction-chart"

export function ChainStats() {
  const { data: stats } = useQuery({
    queryKey: ["chainStats"],
    queryFn: async () => {
      // Fetch latest block info from the endpoint
      const response = await fetch('http://145.223.80.193:26657/status');
      const data = await response.json();
      
      // Extract block information
      const latestBlock = parseInt(data.result.sync_info.latest_block_height);
      const latestBlockTime = new Date(data.result.sync_info.latest_block_time);
      const blockTime = ((Date.now() - latestBlockTime.getTime()) / 1000).toFixed(1);
      
      return {
        price: 583.93,
        btcValue: 0.008701,
        priceChange: "+0.39%",
        marketCap: 86504593753.00,
        marketCapUcc: 142142881,
        transactions: 6311.23,
        tps: 42.0,
        gasPrice: 1,
        gasPriceUsd: 0.01,
        latestBlock,
        blockTime: parseFloat(blockTime),
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 shadow-sm border border-border bg-card rounded-lg mx-4 -mt-8">
      <div className="lg:col-span-2 rounded-lg">
        <StatsGrid stats={stats} />
      </div>
      <div className="lg:col-span-1">
        <TransactionChart data={stats.chartData} />
      </div>
    </div>
  )
}