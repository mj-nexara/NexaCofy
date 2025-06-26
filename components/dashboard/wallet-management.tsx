"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Eye, EyeOff, Plus, Wallet } from "lucide-react"
import { useState } from "react"

import { SafeIcon } from "@/components/safe-icon"

export function WalletManagement() {
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  const wallets = [
    { crypto: "Bitcoin", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: "0.00045 BTC", icon: Wallet },
    { crypto: "Ethereum", address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4", balance: "0.0023 ETH", icon: Wallet },
    { crypto: "Ripple", address: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH", balance: "12.5 XRP", icon: Wallet },
    { crypto: "USDC", address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4", balance: "2.34 USDC", icon: Wallet },
  ]

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Wallet className="w-5 h-5 mr-2" />
          Wallet Management
        </CardTitle>
        <CardDescription className="text-gray-400">Manage your cryptocurrency wallets</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="wallets" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="wallets" className="text-white data-[state=active]:bg-slate-600">
              Wallets
            </TabsTrigger>
            <TabsTrigger value="add" className="text-white data-[state=active]:bg-slate-600">
              Add Wallet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallets" className="space-y-4">
            {wallets.map((wallet, index) => (
              <div key={index} className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      <SafeIcon icon={wallet.icon} className="h-5 w-5 text-white" />
                      {wallet.crypto}
                    </div>
                    <div className="text-sm text-cyan-400">{wallet.balance}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-400 font-mono break-all">{wallet.address}</div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Cryptocurrency</Label>
                <select className="w-full p-2 rounded-md bg-slate-700 border border-slate-600 text-white">
                  <option>Bitcoin (BTC)</option>
                  <option>Ethereum (ETH)</option>
                  <option>Ripple (XRP)</option>
                  <option>USDC</option>
                </select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Wallet Address</Label>
                <Input className="bg-slate-700 border-slate-600 text-white" placeholder="Enter wallet address" />
              </div>

              <div>
                <Label className="text-white mb-2 block">Private Key (Optional)</Label>
                <div className="relative">
                  <Input
                    type={showPrivateKey ? "text" : "password"}
                    className="bg-slate-700 border-slate-600 text-white pr-10"
                    placeholder="Enter private key for auto-withdrawal"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                  >
                    {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Wallet
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
