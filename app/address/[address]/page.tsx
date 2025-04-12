import dynamic from 'next/dynamic';

// Use dynamic import for the client component
const AddressPageClient = dynamic(() => 
  import('@/components/address/AddressPageContent').then(mod => ({ 
    default: mod.AddressPageContent 
  })),
  { ssr: true }
);

export function generateStaticParams() {
  return [];
}

// Use an async page component since TypeScript expects params to be a Promise
export default async function Page({ params }: { params: { address: string } }) {
  // Using await with Promise.resolve to make TypeScript happy
  const resolvedAddress = await Promise.resolve(params.address);
  
  return <AddressPageClient address={resolvedAddress} />;
} 