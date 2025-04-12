import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SearchBox } from "@/components/search-box"
import { TransactionDetail } from "@/components/transaction/transaction-detail"

// This is required for static site generation with dynamic routes
export function generateStaticParams() {
  // For static export, we need to return an empty array or known transaction hashes
  return []
}

// Define correct types for Next.js 15 server components
interface PageProps {
  params: { hash: string }
}

export default function TransactionPage({ params }: PageProps) {
  const hash = params.hash
  
  return (
    <div className="container-fluid mx-auto">
      <div className="bg-card w-full py-6 shadow-sm mb-6">
        <div className="w-full md:w-[60%] px-6">
          <SearchBox />
        </div>
      </div>

      <div className="px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
        <TransactionDetail hash={hash} />
      </div>
    </div>
  )
} 