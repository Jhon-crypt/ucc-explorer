import { AddressPageContent } from "@/components/address/AddressPageContent";

interface AddressPageProps {
  params: { address: string };
}

export function generateStaticParams() {
  const addresses = [
    "0x123456789abcdef",
    "0xa1b2c3d4e5f6789",
    "0xdeadbeefdeadbeef",
  ];

  return addresses.map((address) => ({ address }));
}

export default function AddressPage({ params }: AddressPageProps) {
  return <AddressPageContent address={params.address} />;
}