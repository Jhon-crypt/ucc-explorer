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
                <div className=" overflow-auto">
                    <Tabs defaultValue="transactions" className="mt-8">
                        {/* Tabs Header */}
                        <div className="flex flex-col lg:flex-row justify-start gap-y-4 lg:justify-between items-start">
                            <div className="flex overflow-x-auto scrollbar-hide">
                                <TabsList className="">
                                    <TabsTrigger className= "bg-input font-bold" value="transactions">Transactions</TabsTrigger>
                                    <TabsTrigger className= "bg-input font-bold" value="internal">Internal Transactions</TabsTrigger>
                                    <TabsTrigger className= "bg-input font-bold" value="token-transfers">Token Transfers (BEP-20)</TabsTrigger>
                                    <TabsTrigger className= "bg-input font-bold" value="analytics">Analytics</TabsTrigger>
                                    <TabsTrigger className= "bg-input font-bold" value="multichain">Multichain Portfolio</TabsTrigger>
                                </TabsList>
                            </div>
                            <Button variant="outline" size="sm" className="shrink-0">
                                <Filter className="h-4 w-4 mr-2" />
                                Advanced Filter
                            </Button>
                        </div>

                        {/* Tabs Content */}
                        <TabsContent value="transactions" className=" rounded-lg bg-card shadow-sm mt-4 border border-border p-3">
                            <AddressTransactions address={address} />
                        </TabsContent>
                        <TabsContent value="token-transfers" className="rounded-lg bg-card shadow-sm mt-4 border border-border p-3">
                            <TokenTransfers address={address} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </div>
    );
}