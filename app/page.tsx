import { SearchBar } from "@/components/search-bar"
import { ChainStats } from "@/components/stats/chain-stats"
import { LatestActivity } from "@/components/home/latest-activity"
import { TokenTable } from "@/components/home/token-table"
import { TransferVolume } from "@/components/home/transfer-volume"

export default function Home() {
  return (
    <div className="container-fluid mx-auto">
      <SearchBar />
      <ChainStats />
      <LatestActivity />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 bg-card p-4">
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Top 5 Tokens by Transfer Volume</h2>
          <TokenTable />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Transfer Volume Trends (14D)</h2>
          <TransferVolume />
        </div>
      </div>

    </div>
  )
}