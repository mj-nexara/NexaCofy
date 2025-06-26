"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Coins, DollarSign, Zap, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const walletData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    balance: "0.00045",
    usdValue: "$19.23",
    dailyEarning: "0.00024",
    color: "from-orange-500 to-yellow-500",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: Coins,
    balance: "0.0023",
    usdValue: "$5.67",
    dailyEarning: "0.0024",
    color: "from-blue-500 to-purple-500",
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    icon: Zap,
    balance: "12.5",
    usdValue: "$7.89",
    dailyEarning: "2.4",
    color: "from-cyan-500 to-blue-500",
    address: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: DollarSign,
    balance: "2.34",
    usdValue: "$2.34",
    dailyEarning: "1.2",
    color: "from-green-500 to-emerald-500",
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  },
]

export function WalletDashboard() {
  const [showBalances, setShowBalances] = useState(true)
  const totalUsdValue = walletData.reduce((sum, wallet) => sum + Number.parseFloat(wallet.usdValue.replace("$", "")), 0)

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white flex items-center">
              My NexaCofy Wallets
              <Badge className="ml-2 bg-green-500">Active</Badge>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Total Portfolio Value: {showBalances ? `$${totalUsdValue.toFixed(2)}` : "****"}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            className="text-gray-400 hover:text-white"
          >
            {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {walletData.map((wallet) => {
            const IconComponent = wallet.icon
            return (
              <div
                key={wallet.symbol}
                className="p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-slate-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${wallet.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{wallet.name}</div>
                      <div className="text-sm text-gray-400">{wallet.symbol}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Balance:</span>
                    <span className="text-white font-mono">
                      {showBalances ? `${wallet.balance} ${wallet.symbol}` : "****"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">USD Value:</span>
                    <span className="text-cyan-400 font-semibold">{showBalances ? wallet.usdValue : "****"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Daily Earning:</span>
                    <span className="text-green-400 text-sm">
                      +{showBalances ? `${wallet.dailyEarning} ${wallet.symbol}` : "****"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-600">
                  <div className="text-xs text-gray-500 font-mono break-all">
                    {showBalances ? wallet.address : "************************************"}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
