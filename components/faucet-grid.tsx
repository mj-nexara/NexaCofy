"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Coins, DollarSign, Zap } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

const faucets = [
  {
    id: "bitcoin",
    name: "Bitcoin Faucet",
    symbol: "BTC",
    icon: Bitcoin,
    reward: "0.00001 BTC",
    usdValue: "$0.43",
    nextClaim: "45 min",
    status: "active",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "ethereum",
    name: "Ethereum Faucet",
    symbol: "ETH",
    icon: Coins,
    reward: "0.0001 ETH",
    usdValue: "$0.23",
    nextClaim: "12 min",
    status: "active",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "ripple",
    name: "Ripple Faucet",
    symbol: "XRP",
    icon: Zap,
    reward: "0.1 XRP",
    usdValue: "$0.06",
    nextClaim: "Ready",
    status: "ready",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "usdc",
    name: "USDC Faucet",
    symbol: "USDC",
    icon: DollarSign,
    reward: "0.05 USDC",
    usdValue: "$0.05",
    nextClaim: "28 min",
    status: "active",
    color: "from-green-500 to-emerald-500",
  },
]

export function FaucetGrid() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Available Faucets</h2>
          <p className="text-gray-300 text-lg">Claim from multiple cryptocurrency faucets automatically</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faucets.map((faucet) => {
            const IconComponent = faucet.icon
            return (
              <Card
                key={faucet.id}
                className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${faucet.color}`}>
                      <SafeIcon icon={IconComponent} className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant={faucet.status === "ready" ? "default" : "secondary"}
                      className={faucet.status === "ready" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {faucet.status === "ready" ? "Ready" : "Active"}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{faucet.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {faucet.symbol} • {faucet.usdValue}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Reward:</span>
                      <span className="text-cyan-400 font-semibold">{faucet.reward}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Next Claim:</span>
                      <span className="text-white">{faucet.nextClaim}</span>
                    </div>
                    <Button
                      className="w-full"
                      disabled={faucet.status !== "ready"}
                      variant={faucet.status === "ready" ? "default" : "secondary"}
                    >
                      {faucet.status === "ready" ? "Claim Now" : "Auto Claiming"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
