import { SearchBar } from "@/components/search-bar"
import { ChainStats } from "@/components/stats/chain-stats"
import { LatestActivity } from "@/components/home/latest-activity"
import { ModuleAccounts } from "@/components/stats/module-accounts"

export default function Home() {
  return (
    <div className="container-fluid mx-auto">
      <SearchBar />
      <ChainStats />
      <LatestActivity />

      <div className="mt-8 bg-card p-4">
        <h2 className="text-2xl font-bold mb-4">Module Accounts</h2>
        <ModuleAccounts />
      </div>

    </div>
  )
}