import { AddressPageContent } from "@/components/address/AddressPageContent";

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { address: string } }) {
  return <AddressPageContent address={params.address} />;
} 