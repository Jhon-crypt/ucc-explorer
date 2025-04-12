import { SearchBar } from "@/components/search-bar"
import { ChainStats } from "@/components/stats/chain-stats"
import { LatestActivity } from "@/components/home/latest-activity"
import { ModuleAccounts } from "@/components/stats/module-accounts"
import { ChainDetails } from "@/components/stats/chain-details"
import { LatestBlocks } from "@/components/home/latest-blocks"
import { LatestTransactions } from "@/components/home/latest-transactions"

export default function Home() {
  return (
    <div className="container-fluid mx-auto">
      <SearchBar />
      <ChainStats />
      <ChainDetails />
      
      {/* Latest Blocks and Transactions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <LatestBlocks />
        <LatestTransactions />
      </div>

      <div className="mt-8 bg-card p-4">
        <h2 className="text-2xl font-bold mb-4">Module Accounts</h2>
        <ModuleAccounts />
      </div>

    </div>
  )
}