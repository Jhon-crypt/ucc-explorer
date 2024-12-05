"use client"

import { BalanceCard } from "./balance-card"
import { InfoCard } from "./info-card"
import { MultichainCard } from "./multichain-card"

interface AddressOverviewProps {
  address: string
}

export function AddressOverview({ address }: AddressOverviewProps) {
  const mockData = {
    balance: {
      bnb: 0,
      value: 0.00,
      tokens: [
        {
          type: "BEP-20",
          name: "GOGAME",
          symbol: "GGO",
          amount: "200",
        },
        {
          type: "BEP-20",
          name: "S39 Token",
          symbol: "S39",
          amount: "200",
        },
        {
          type: "BEP-20",
          name: "ThankYou",
          symbol: "ThankY",
          amount: "90,000,000,000,000,000",
        },
        {
          type: "BEP-20",
          name: "TOKEN",
          symbol: "TOKEN",
          amount: "298,222.198686",
          suspicious: true
        }
      ]
    },
    info: {
      transactions: {
        latest: "421 days ago",
        first: "514 days ago"
      },
      fundedBy: {
        address: "UC4e5acf96..5fe33d23f",
        txn: "UC4e5acf96...5fe33d23f"
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BalanceCard balance={mockData.balance} />
      <InfoCard info={mockData.info} />
      <MultichainCard />
    </div>
  )
}