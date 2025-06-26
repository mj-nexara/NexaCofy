"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Coins, DollarSign, Zap, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

const transactions = [
  {
    id: 1,
    type: "claim",
    crypto: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    amount: "+0.00001",
    usdValue: "+$0.43",
    status: "completed",
    timestamp: "2 minutes ago",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: 2,
    type: "withdrawal",
    crypto: "USDC",
    symbol: "USDC",
    icon: DollarSign,
    amount: "-5.00",
    usdValue: "-$5.00",
    status: "pending",
    timestamp: "1 hour ago",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    type: "claim",
    crypto: "Ripple",
    symbol: "XRP",
    icon: Zap,
    amount: "+0.1",
    usdValue: "+$0.06",
    status: "completed",
    timestamp: "1 hour ago",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    type: "claim",
    crypto: "Ethereum",
    symbol: "ETH",
    icon: Coins,
    amount: "+0.0001",
    usdValue: "+$0.23",
    status: "completed",
    timestamp: "2 hours ago",
    color: "from-blue-500 to-purple-500",
  },
]

export function TransactionHistory() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Transaction History</CardTitle>
        <CardDescription className="text-gray-400">Recent claims and withdrawals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => {
            const IconComponent = tx.icon
            const isIncoming = tx.type === "claim"

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 border border-slate-600"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tx.color} relative`}>
                    <SafeIcon icon={IconComponent} className="h-4 w-4 text-white" />
                    <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-0.5">
                      {isIncoming ? (
                        <ArrowDownLeft className="w-3 h-3 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3 text-red-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-medium capitalize">
                      {tx.type} {tx.crypto}
                    </div>
                    <div className="text-sm text-gray-400">{tx.timestamp}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-mono ${isIncoming ? "text-green-400" : "text-red-400"}`}>
                    {tx.amount} {tx.symbol}
                  </div>
                  <div className="text-sm text-gray-400">{tx.usdValue}</div>
                  <Badge
                    variant={tx.status === "completed" ? "default" : "secondary"}
                    className={`mt-1 text-xs ${
                      tx.status === "completed"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
