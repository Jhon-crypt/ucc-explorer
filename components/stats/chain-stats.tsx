"use client"

import { useQuery } from "@tanstack/react-query"
import { StatsGrid } from "./stats-grid"
import { TransactionChart } from "./transaction-chart"

interface ValidatorInfo {
  totalTokens: number;
  commissionRate: number;
  bondedStatus: string;
  moniker: string;
  delegatorShares: number;
}

export function ChainStats() {
  // Fetch voting power from validators
  const { data: validatorData } = useQuery<ValidatorInfo>({
    queryKey: ["validators"],
    queryFn: async () => {
      const response = await fetch('http://145.223.80.193:1317/cosmos/staking/v1beta1/validators');
      const data = await response.json();
      
      const validator = data.validators[0]; // Get the first validator
      return {
        totalTokens: parseInt(validator.tokens) / Math.pow(10, 18),
        commissionRate: parseFloat(validator.commission.commission_rates.rate) * 100,
        bondedStatus: validator.status,
        moniker: validator.description.moniker,
        delegatorShares: parseFloat(validator.delegator_shares) / Math.pow(10, 18)
      };
    },
    refetchInterval: 1000,
    staleTime: 0,
  });

  // Track previous block height and transaction count for TPS calculation
  let prevBlockHeight = 0;
  let prevTimestamp = Date.now();
  let prevTxCount = 0;

  const { data: stats } = useQuery({
    queryKey: ["chainStats"],
    queryFn: async () => {
      // Fetch latest block info from the endpoint
      const response = await fetch('http://145.223.80.193:26657/status');
      const data = await response.json();
      
      // Extract block information
      const latestHeight = parseInt(data.result.sync_info.latest_block_height);
      const latestBlockTime = new Date(data.result.sync_info.latest_block_time);
      const blockTime = ((Date.now() - latestBlockTime.getTime()) / 1000).toFixed(1);

      // Calculate total transactions from last 100 blocks
      const blockPromises = [];
      for (let i = 0; i < 100; i++) {
        const height = latestHeight - i;
        blockPromises.push(
          fetch(`http://145.223.80.193:26657/block?height=${height}`)
            .then(res => res.json())
            .then(blockData => blockData.result.block.data.txs ? blockData.result.block.data.txs.length : 0)
        );
      }
      
      const blockTxCounts = await Promise.all(blockPromises);
      const totalTx = blockTxCounts.reduce((sum, count) => sum + count, 0);
      
      // Calculate TPS
      const now = Date.now();
      const timeDiff = (now - prevTimestamp) / 1000; // Convert to seconds
      const blockDiff = latestHeight - prevBlockHeight;
      const txDiff = totalTx - prevTxCount;
      const tps = blockDiff > 0 ? Number((txDiff / timeDiff).toFixed(1)) : 0;

      // Update previous values for next calculation
      prevBlockHeight = latestHeight;
      prevTimestamp = now;
      prevTxCount = totalTx;
      
      return {
        transactions: totalTx,
        tps,
        gasPrice: 1,
        gasPriceUsd: 0.01,
        latestBlock: latestHeight,
        blockTime: parseFloat(blockTime),
        votingPower: validatorData?.totalTokens || 0,
        validatorInfo: {
          commissionRate: validatorData?.commissionRate || 0,
          bondedStatus: validatorData?.bondedStatus || 'UNKNOWN',
          moniker: validatorData?.moniker || 'Unknown',
          delegatorShares: validatorData?.delegatorShares || 0
        }
      }
    },
    refetchInterval: 1000,
    staleTime: 0,
    refetchOnWindowFocus: true,
    enabled: validatorData !== undefined,
  });

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 shadow-sm border border-border bg-card rounded-lg mx-4 -mt-8">
      <div className="lg:col-span-2 rounded-lg">
        <StatsGrid stats={stats} />
      </div>
      <div className="lg:col-span-1">
        <TransactionChart />
      </div>
    </div>
  )
}