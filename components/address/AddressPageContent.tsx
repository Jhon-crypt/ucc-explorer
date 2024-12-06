"use client";

import { AddressHeader } from "@/components/address/address-header";
import { AddressOverview } from "@/components/address/address-overview";
import { AddressTransactions } from "@/components/address/address-transactions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBox } from "../search-box";
import { TokenTransfers } from "./token-transfers";
import { Filter } from "lucide-react";
import { Button } from "../ui/button";
export function AddressPageContent({ address }: { address: string }) {
    return (
        <div className="container-fluid mx-auto overflow-auto">
            <div className="bg-card w-full py-6 shadow-sm mb-6">
                <div className="w-full md:w-[60%] px-6">
                    <SearchBox />
                </div>
            </div>
            <AddressHeader address={address} />

            <div className="px-4 md:px-6">
                <AddressOverview address={address} />
                <div className="rounded-lg bg-card shadow-sm mt-6 border-input p-3 overflow-auto">
                    <Tabs defaultValue="transactions" className="mt-8">
                        {/* Tabs Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <TabsList className="flex overflow-x-auto scrollbar-hide">
                                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                                <TabsTrigger value="internal">Internal Transactions</TabsTrigger>
                                <TabsTrigger value="token-transfers">Token Transfers (BEP-20)</TabsTrigger>
                                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                <TabsTrigger value="multichain">Multichain Portfolio</TabsTrigger>
                            </TabsList>
                            <Button variant="outline" size="sm" className="shrink-0">
                                <Filter className="h-4 w-4 mr-2" />
                                Advanced Filter
                            </Button>
                        </div>

                        {/* Tabs Content */}
                        <TabsContent value="transactions" className="mt-6">
                            <AddressTransactions address={address} />
                        </TabsContent>
                        <TabsContent value="token-transfers" className="mt-6">
                            <TokenTransfers address={address} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </div>
    );
}