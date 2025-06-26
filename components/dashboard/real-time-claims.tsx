"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bitcoin, Coins, DollarSign, Zap, RefreshCw } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

interface RealClaim {
  id: string
  crypto: string
  symbol: string
  amount: string
  usdValue: number
  status: "pending" | "completed" | "failed"
  timestamp: string
  txHash?: string
  realClaim: boolean
}

export function RealTimeClaims() {
  const [claims, setClaims] = useState<RealClaim[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Real-time data fetching
  useEffect(() => {
    const fetchRealClaims = async () => {
      try {
        const response = await fetch("/api/claims")
        const data = await response.json()

        if (data.success && data.realClaims) {
          setClaims(data.realClaims)
          setLastUpdate(new Date())
        }
      } catch (error) {
        console.error("Failed to fetch real claims:", error)
      }
    }

    // Fetch immediately
    fetchRealClaims()

    // Then fetch every 30 seconds for real-time updates
    const interval = setInterval(fetchRealClaims, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleManualClaim = async (faucetType: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/real-faucets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faucetType,
          walletAddress: "your-wallet-address", // User's real wallet
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Add new real claim to the list
        const newClaim: RealClaim = {
          id: Date.now().toString(),
          crypto: faucetType,
          symbol: faucetType.toUpperCase(),
          amount: result.amount,
          usdValue: result.usdValue || 0,
          status: "completed",
          timestamp: result.timestamp,
          txHash: result.txHash,
          realClaim: true,
        }

        setClaims((prev) => [newClaim, ...prev])
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error("Manual claim failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white flex items-center">
              Real-Time Claims
              <Badge className="ml-2 bg-green-500">LIVE</Badge>
            </CardTitle>
            <CardDescription className="text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              onClick={() => handleManualClaim("bitcoin")}
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Bitcoin className="w-4 h-4 mr-2" />
              Claim BTC
            </Button>
            <Button
              onClick={() => handleManualClaim("ethereum")}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Coins className="w-4 h-4 mr-2" />
              Claim ETH
            </Button>
            <Button
              onClick={() => handleManualClaim("ripple")}
              disabled={isLoading}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              Claim XRP
            </Button>
            <Button
              onClick={() => handleManualClaim("usdc")}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Claim USDC
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {claims.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No real claims yet. Click buttons above to start claiming!</p>
              <p className="text-sm mt-2">⚠️ Current data is DEMO only</p>
            </div>
          ) : (
            claims.map((claim) => (
              <div
                key={claim.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 border border-slate-600"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                    <SafeIcon icon={Bitcoin} className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center">
                      {claim.crypto}
                      {claim.realClaim && <Badge className="ml-2 bg-green-500 text-xs">REAL</Badge>}
                    </div>
                    <div className="text-sm text-gray-400">
                      {claim.amount} • ${claim.usdValue.toFixed(2)}
                    </div>
                    {claim.txHash && (
                      <div className="text-xs text-cyan-400 font-mono">TX: {claim.txHash.substring(0, 16)}...</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{new Date(claim.timestamp).toLocaleTimeString()}</div>
                  </div>
                  <Badge
                    variant={claim.status === "completed" ? "default" : "secondary"}
                    className={`${
                      claim.status === "completed"
                        ? "bg-green-500 hover:bg-green-600"
                        : claim.status === "pending"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {claim.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
