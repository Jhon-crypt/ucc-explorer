"use client"

import { format } from "date-fns"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface TransactionChartProps {
  data: Array<{
    date: Date
    value: number
  }>
}

export function TransactionChart({ data }: TransactionChartProps) {
  return (
    <div className="bg-card p-4 h-fit rounded-lg">
      <div className="text-sm text-muted-foreground opacity-50 mb-4">
        UCC SMART CHAIN TRANSACTION HISTORY IN 14 DAYS
      </div>
      <div className="h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), "MMM dd")}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card p-2 border rounded-lg shadow-sm">
                      <div className="text-sm">
                        {format(new Date(payload[0].payload.date), "MMM dd, yyyy")}
                      </div>
                      <div className="font-semibold">
                        {payload[0].value?.toLocaleString()} transactions
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}