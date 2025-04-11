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
      const latestBlock = parseInt(data.result.sync_info.latest_block_height);
      const latestBlockTime = new Date(data.result.sync_info.latest_block_time);
      const blockTime = ((Date.now() - latestBlockTime.getTime()) / 1000).toFixed(1);

      // Fetch the latest block to get transaction count
      const blockResponse = await fetch(`http://145.223.80.193:26657/block?height=${latestBlock}`);
      const blockData = await blockResponse.json();
      const txCount = blockData.result.block.data.txs ? blockData.result.block.data.txs.length : 0;

      // Calculate TPS
      const now = Date.now();
      const timeDiff = (now - prevTimestamp) / 1000; // Convert to seconds
      const blockDiff = latestBlock - prevBlockHeight;
      const txDiff = txCount - prevTxCount;
      const tps = blockDiff > 0 ? Number((txDiff / timeDiff).toFixed(1)) : 0;

      // Update previous values for next calculation
      prevBlockHeight = latestBlock;
      prevTimestamp = now;
      prevTxCount = txCount;
      
      return {
        price: 583.93,
        btcValue: 0.008701,
        priceChange: "+0.39%",
        marketCap: 86504593753.00,
        marketCapUcc: 142142881,
        transactions: txCount,
        tps,
        gasPrice: 1,
        gasPriceUsd: 0.01,
        latestBlock,
        blockTime: parseFloat(blockTime),
        votingPower: validatorData?.totalTokens || 0,
        validatorInfo: {
          commissionRate: validatorData?.commissionRate || 0,
          bondedStatus: validatorData?.bondedStatus || 'UNKNOWN',
          moniker: validatorData?.moniker || 'Unknown',
          delegatorShares: validatorData?.delegatorShares || 0
        },
        chartData: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000),
          value: 2800 + Math.random() * 1600
        }))
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
        <TransactionChart data={stats.chartData} />
      </div>
    </div>
  )
}