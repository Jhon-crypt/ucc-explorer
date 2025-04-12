import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBox } from "@/components/search-box"
import { BlockDetail } from "@/components/block/block-detail"

// This is required for static site generation with dynamic routes
export function generateStaticParams() {
  // For static export, we need to return an empty array or known block heights
  return []
}

export default function BlockPage({ params }: { params: { height: string } }) {
  const height = parseInt(params.height)
  
  return (
    <div className="container-fluid mx-auto">
      <div className="bg-card w-full py-6 shadow-sm mb-6">
        <div className="w-full md:w-[60%] px-6">
          <SearchBox />
        </div>
      </div>

      <div className="px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-6">Block #{height}</h1>
        <BlockDetail height={height} />
      </div>
    </div>
  )
} 