"use client"

import { useQuery } from "@tanstack/react-query"
import { StatsCard } from "./stats-card"
import { 
  Shield,
  Network,
  BarChart3
} from "lucide-react"

export function ChainStats() {
  // Fetch validator data
  const { data: validatorData } = useQuery({
    queryKey: ["validators"],
    queryFn: async () => {
      const response = await fetch('http://145.223.80.193:1317/cosmos/staking/v1beta1/validators');
      const data = await response.json();
      // Get the first validator
      const validator = data.validators[0];
      return {
        moniker: validator.description.moniker,
        status: validator.status === "BOND_STATUS_BONDED" ? "BONDED" : validator.status,
        commission: (parseFloat(validator.commission.commission_rates.rate) * 100).toFixed(0) + "%"
      };
    },
    refetchInterval: 1000,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Fetch status data
  const { data: statusData } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const response = await fetch('http://145.223.80.193:26657/status');
      const data = await response.json();
      
      // Extract block information
      const latestBlock = parseInt(data.result.sync_info.latest_block_height);
      const latestBlockTime = new Date(data.result.sync_info.latest_block_time);
      const blockTimeSeconds = ((Date.now() - latestBlockTime.getTime()) / 1000).toFixed(1);
      
      return {
        latestBlock,
        blockTime: `${blockTimeSeconds}s`,
        gasPrice: "1 Gwei ($0.01)"
      };
    },
    refetchInterval: 1000,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Fetch transaction data
  const { data: txStats } = useQuery({
    queryKey: ["txStats"],
    queryFn: async () => {
      // Fetch voting power from validators
      const validatorsResponse = await fetch('http://145.223.80.193:1317/cosmos/staking/v1beta1/validators');
      const validatorsData = await validatorsResponse.json();
      
      // Calculate total tokens (converting from atucc with 18 decimals to UCC)
      const totalTokens = validatorsData.validators.reduce((sum: number, validator: any) => {
        return sum + (parseInt(validator.tokens) / Math.pow(10, 18));
      }, 0);
      
      return {
        totalTx: 0, // No transactions yet
        tps: "0.0",
        votingPower: `${(totalTokens / 1000).toFixed(0)}K UCC`,
        shares: `${(totalTokens / 1000).toFixed(0)}K shares`
      };
    },
    refetchInterval: 1000,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <StatsCard
        title="VALIDATOR STATUS"
        icon={Shield}
        items={[
          {
            label: validatorData?.moniker || "universe-testnet-node",
            value: validatorData?.status || "BONDED"
          },
          {
            label: "Commission Rate",
            value: validatorData?.commission || "10%"
          }
        ]}
      />
      
      <StatsCard
        title="NETWORK STATS"
        icon={Network}
        items={[
          {
            label: "Latest Block",
            value: statusData ? `${statusData.latestBlock} (${statusData.blockTime})` : "Loading..."
          },
          {
            label: "Gas Price",
            value: statusData?.gasPrice || "1 Gwei ($0.01)"
          }
        ]}
      />
      
      <StatsCard
        title="TRANSACTION STATS"
        icon={BarChart3}
        items={[
          {
            label: "Total Transactions",
            value: txStats?.totalTx?.toString() || "0"
          },
          {
            label: "TPS",
            value: txStats?.tps || "0.0"
          },
          {
            label: "Voting Power",
            value: txStats?.votingPower || "1K UCC",
            subValue: txStats?.shares || "1K shares"
          }
        ]}
      />
    </div>
  )
}