"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coffee, Zap, TrendingUp, Clock, ExternalLink } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

interface CoffeeClaimData {
  coffeeEquivalentETH: string
  coffeePriceUSD: number
  currentETHPrice: number
  lastUpdated: string
}

export function CoffeeClaimWidget() {
  const [claimData, setClaimData] = useState<CoffeeClaimData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastClaim, setLastClaim] = useState<any>(null)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)

  // Real-time data updates
  useEffect(() => {
    const fetchClaimData = async () => {
      try {
        const response = await fetch("/api/coffee-claim")
        const data = await response.json()
        setClaimData(data)
      } catch (error) {
        console.error("Failed to fetch claim data:", error)
      }
    }

    fetchClaimData()
    const interval = setInterval(fetchClaimData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setInterval(() => {
        setCooldownRemaining((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [cooldownRemaining])

  const handleCoffeeClaim = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/coffee-claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // Replace with actual user ID
          walletAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87", // Replace with user's wallet
          claimType: "coffee",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setLastClaim(result)
        setCooldownRemaining(3600) // 1 hour cooldown
      } else {
        if (result.cooldownRemaining) {
          setCooldownRemaining(result.cooldownRemaining)
        }
        alert(result.error)
      }
    } catch (error) {
      console.error("Claim failed:", error)
      alert("Claim failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!claimData) {
    return (
      <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200">
        <CardContent className="p-6">
          <div className="text-center">Loading coffee claim data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-800">
          <SafeIcon icon={Coffee} className="w-6 h-6 mr-2" />
          Coffee Equivalent ETH Claim
          <Badge className="ml-2 bg-green-500">MAINNET</Badge>
        </CardTitle>
        <CardDescription className="text-amber-700">
          Claim real ETH equivalent to one cup of coffee • Updated every minute
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Real-time Price Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-lg p-3">
            <div className="text-sm text-amber-600">Coffee Equivalent</div>
            <div className="text-lg font-bold text-amber-800">{claimData.coffeeEquivalentETH} ETH</div>
            <div className="text-xs text-amber-600">${claimData.coffeePriceUSD.toFixed(2)} USD</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="text-sm text-amber-600">Current ETH Price</div>
            <div className="text-lg font-bold text-amber-800">${claimData.currentETHPrice.toFixed(2)}</div>
            <div className="text-xs text-amber-600 flex items-center">
              <SafeIcon icon={TrendingUp} className="w-3 h-3 mr-1" />
              Live Price
            </div>
          </div>
        </div>

        {/* Claim Button */}
        <div className="space-y-2">
          <Button
            onClick={handleCoffeeClaim}
            disabled={isLoading || cooldownRemaining > 0}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            size="lg"
          >
            {isLoading ? (
              <>
                <SafeIcon icon={Zap} className="w-4 h-4 mr-2 animate-spin" />
                Processing Claim...
              </>
            ) : cooldownRemaining > 0 ? (
              <>
                <SafeIcon icon={Clock} className="w-4 h-4 mr-2" />
                Cooldown: {formatTime(cooldownRemaining)}
              </>
            ) : (
              <>
                <SafeIcon icon={Coffee} className="w-4 h-4 mr-2" />
                Claim Coffee ETH ({claimData.coffeeEquivalentETH} ETH)
              </>
            )}
          </Button>

          <div className="text-xs text-center text-amber-600">
            Last updated: {new Date(claimData.lastUpdated).toLocaleTimeString()}
          </div>
        </div>

        {/* Last Claim Display */}
        {lastClaim && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-sm font-medium text-green-800">✅ Claim Successful!</div>
            <div className="text-xs text-green-600 space-y-1 mt-1">
              <div>
                Amount: {lastClaim.amount} ETH (${lastClaim.amountUSD})
              </div>
              <div>Network: {lastClaim.network}</div>
              <div className="flex items-center">
                Transaction:{" "}
                <a
                  href={lastClaim.explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-600 hover:underline flex items-center"
                >
                  {lastClaim.txHash.substring(0, 10)}...
                  <SafeIcon icon={ExternalLink} className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-amber-600 bg-amber-50 rounded p-2">
          <strong>How it works:</strong> This system calculates the current ETH equivalent of a $3.50 coffee and allows
          you to claim that amount every hour. Prices update in real-time from Ethereum Mainnet.
        </div>
      </CardContent>
    </Card>
  )
}
