"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bitcoin, Coins, DollarSign, Zap } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

const claimingData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    claimed: "0.00045 BTC",
    usdValue: "$19.23",
    nextClaim: 15,
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: Coins,
    claimed: "0.0023 ETH",
    usdValue: "$5.67",
    nextClaim: 42,
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    icon: Zap,
    claimed: "12.5 XRP",
    usdValue: "$7.89",
    nextClaim: 8,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: DollarSign,
    claimed: "2.34 USDC",
    usdValue: "$2.34",
    nextClaim: 33,
    color: "from-green-500 to-emerald-500",
  },
]

export function ClaimingStats() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Today's Claims</CardTitle>
        <CardDescription className="text-gray-400">Automatic claiming progress for all faucets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {claimingData.map((crypto) => {
            const IconComponent = crypto.icon
            return (
              <div key={crypto.symbol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${crypto.color}`}>
                      <SafeIcon icon={IconComponent} className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{crypto.name}</div>
                      <div className="text-sm text-gray-400">
                        {crypto.claimed} • {crypto.usdValue}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyan-400">Next in {crypto.nextClaim}m</div>
                  </div>
                </div>
                <Progress value={100 - crypto.nextClaim} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
