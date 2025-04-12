import { SearchBox } from "@/components/search-box"
import { BlockDetail } from "@/components/block/block-detail"

// This function is essential for Next.js static site generation with dynamic routes
export function generateStaticParams() {
  // Return empty array for static export
  return []
}

// Page component with async to match expected types
export default async function Page({ params }: { params: { height: string } }) {
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