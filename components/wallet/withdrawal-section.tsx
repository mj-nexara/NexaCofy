"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Send, AlertCircle } from "lucide-react"
import { useState } from "react"

export function WithdrawalSection() {
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")

  const minWithdrawals = {
    BTC: { min: "0.0001", fee: "0.00001" },
    ETH: { min: "0.001", fee: "0.0001" },
    XRP: { min: "1", fee: "0.1" },
    USDC: { min: "1", fee: "0.1" },
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Send className="w-5 h-5 mr-2" />
          Withdraw Funds
        </CardTitle>
        <CardDescription className="text-gray-400">Withdraw your NexaCofy earnings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-amber-500/10 border-amber-500/20">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            Minimum withdrawal amounts apply. Network fees will be deducted automatically.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Cryptocurrency</Label>
              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select crypto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="XRP">Ripple (XRP)</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-2 block">Amount</Label>
              <Input
                type="number"
                step="0.00000001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter amount"
              />
              {selectedCrypto && (
                <p className="text-xs text-gray-400 mt-1">
                  Min: {minWithdrawals[selectedCrypto as keyof typeof minWithdrawals]?.min} {selectedCrypto}
                </p>
              )}
            </div>

            <div>
              <Label className="text-white mb-2 block">Destination Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter wallet address"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
              <h4 className="text-white font-medium mb-3">Withdrawal Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white">
                    {amount || "0"} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network Fee:</span>
                  <span className="text-red-400">
                    -{selectedCrypto && minWithdrawals[selectedCrypto as keyof typeof minWithdrawals]?.fee}{" "}
                    {selectedCrypto}
                  </span>
                </div>
                <div className="border-t border-slate-600 pt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-300">You'll Receive:</span>
                    <span className="text-green-400">
                      {amount && selectedCrypto
                        ? (
                            Number.parseFloat(amount) -
                            Number.parseFloat(minWithdrawals[selectedCrypto as keyof typeof minWithdrawals]?.fee || "0")
                          ).toFixed(8)
                        : "0"}{" "}
                      {selectedCrypto}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-600 hover:to-cyan-600"
              disabled={!selectedCrypto || !amount || !address}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Withdraw Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
