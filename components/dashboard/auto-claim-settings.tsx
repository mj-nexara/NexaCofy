"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"

export function AutoClaimSettings() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Auto Claim Settings</CardTitle>
        <CardDescription className="text-gray-400">Configure your automated claiming preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="bitcoin-auto" className="text-white">
                Bitcoin Auto Claim
              </Label>
              <Switch id="bitcoin-auto" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ethereum-auto" className="text-white">
                Ethereum Auto Claim
              </Label>
              <Switch id="ethereum-auto" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ripple-auto" className="text-white">
                Ripple Auto Claim
              </Label>
              <Switch id="ripple-auto" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="usdc-auto" className="text-white">
                USDC Auto Claim
              </Label>
              <Switch id="usdc-auto" defaultChecked />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-white mb-2 block">Claim Interval</Label>
              <Select defaultValue="60">
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-2 block">Daily Claim Limit</Label>
              <Input
                type="number"
                defaultValue="24"
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Maximum claims per day"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-white">
                Email Notifications
              </Label>
              <Switch id="notifications" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
