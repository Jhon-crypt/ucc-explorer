"use client";

import { AddressHeader } from "@/components/address/address-header";
import { AddressOverview } from "@/components/address/address-overview";
import { AddressTransactions } from "@/components/address/address-transactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBox } from "../search-box";
import { TokenTransfers } from "./token-transfers";

export function AddressPageContent({ address }: { address: string }) {
    return (
        <div className="container-fluid mx-auto">
            <div className="bg-card w-full py-6 shadow-sm mb-6">
                <div className="w-[60%] px-6">
                    <SearchBox />
                </div>
            </div>
            <AddressHeader address={address} />

            <div className=" px-6">
                <AddressOverview address={address} />

                <Tabs defaultValue="transactions" className="mt-8">
                    <TabsList>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        <TabsTrigger value="internal">Internal Transactions</TabsTrigger>
                        <TabsTrigger value="token-transfers">Token Transfers (BEP-20)</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="multichain">Multichain Portfolio</TabsTrigger>
                    </TabsList>
                    <TabsContent value="transactions" className="mt-6">
                        <AddressTransactions address={address} />
                    </TabsContent>
                    <TabsContent value="token-transfers" className="mt-6">
                        <TokenTransfers address={address} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}