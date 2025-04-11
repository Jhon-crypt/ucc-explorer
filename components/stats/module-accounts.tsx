"use client"

import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface ModuleAccount {
  name: string
  address: string
  permissions: string[]
}

export function ModuleAccounts() {
  const { data: moduleAccounts, isLoading } = useQuery<ModuleAccount[]>({
    queryKey: ["moduleAccounts"],
    queryFn: async () => {
      const response = await fetch('http://145.223.80.193:1317/cosmos/auth/v1beta1/module_accounts')
      const data = await response.json()
      return data.accounts.map((account: any) => ({
        name: account.name,
        address: account.base_account.address,
        permissions: account.permissions || []
      }))
    },
    refetchInterval: 1000,
    staleTime: 0,
  })

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading module accounts...</div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Module Accounts</h2>
        <p className="text-sm text-muted-foreground">System accounts and their permissions</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Permissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moduleAccounts?.map((account) => (
            <TableRow key={account.address}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell className="font-mono text-sm">{account.address}</TableCell>
              <TableCell>
                <div className="flex gap-1.5 flex-wrap">
                  {account.permissions.map((permission, i) => (
                    <Badge key={i} variant="secondary">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
} 