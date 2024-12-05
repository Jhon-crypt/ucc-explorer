import { SearchBar } from "@/components/search-bar"
import { ChainStats } from "@/components/stats/chain-stats"
import { LatestActivity } from "@/components/home/latest-activity"
import { TokenTable } from "@/components/home/token-table"
import { TransferVolume } from "@/components/home/transfer-volume"

export default function Home() {
  return (
    <div className="container-fluid mx-auto px-4">

      <div className="flex flex-col md:flex-row w-full gap-8 bg-black px-6 py-6 min-h-32">
        <SearchBar />
        <div className="text-center bg-white mx-auto w-full md:w-[40%] rounded-md p-2 flex items-center justify-center text-black">Ads</div>
      </div>
      <ChainStats />
      <LatestActivity />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 bg-card py-4">
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