import { AddressPageContent } from "@/components/address/AddressPageContent";

// This function is essential for Next.js static site generation with dynamic routes
export function generateStaticParams() {
  // Example addresses for static generation
  const addresses = [
    "0x123456789abcdef",
    "0xa1b2c3d4e5f6789",
    "0xdeadbeefdeadbeef",
  ];

  return addresses.map((address) => ({ address }));
}

// Page component with async to match expected types
export default async function Page({ params }: { params: { address: string } }) {
  return <AddressPageContent address={params.address} />;
}