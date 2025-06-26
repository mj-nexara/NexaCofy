"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Coins, DollarSign, Zap, CheckCircle, Clock } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

const recentClaims = [
  {
    id: 1,
    crypto: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    amount: "0.00001 BTC",
    usdValue: "$0.43",
    status: "completed",
    timestamp: "2 minutes ago",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: 2,
    crypto: "Ripple",
    symbol: "XRP",
    icon: Zap,
    amount: "0.1 XRP",
    usdValue: "$0.06",
    status: "completed",
    timestamp: "1 hour ago",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    crypto: "Ethereum",
    symbol: "ETH",
    icon: Coins,
    amount: "0.0001 ETH",
    usdValue: "$0.23",
    status: "pending",
    timestamp: "1 hour ago",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 4,
    crypto: "USDC",
    symbol: "USDC",
    icon: DollarSign,
    amount: "0.05 USDC",
    usdValue: "$0.05",
    status: "completed",
    timestamp: "2 hours ago",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    crypto: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    amount: "0.00001 BTC",
    usdValue: "$0.43",
    status: "completed",
    timestamp: "3 hours ago",
    color: "from-orange-500 to-yellow-500",
  },
]

export function RecentClaims() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Claims</CardTitle>
        <CardDescription className="text-gray-400">Your latest automated cryptocurrency claims</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentClaims.map((claim) => {
            const IconComponent = claim.icon
            return (
              <div
                key={claim.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 border border-slate-600"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${claim.color}`}>
                    <SafeIcon icon={IconComponent} className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{claim.crypto}</div>
                    <div className="text-sm text-gray-400">
                      {claim.amount} • {claim.usdValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{claim.timestamp}</div>
                  </div>
                  <Badge
                    variant={claim.status === "completed" ? "default" : "secondary"}
                    className={`${claim.status === "completed" ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}
                  >
                    {claim.status === "completed" ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </>
                    )}
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
