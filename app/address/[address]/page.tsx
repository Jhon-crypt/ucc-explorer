import { AddressPageContent } from "@/components/address/AddressPageContent";

export async function generateStaticParams() {
  const addresses = [
    "0x123456789abcdef",
    "0xa1b2c3d4e5f6789",
    "0xdeadbeefdeadbeef",
  ];

  return addresses.map((address) => ({ address }));
}

export default function AddressPage({ params }: { params: { address: string } }) {
  return <AddressPageContent address={params.address} />;
}