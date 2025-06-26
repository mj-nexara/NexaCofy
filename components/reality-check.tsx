"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Coffee, DollarSign, Clock } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

export function RealityCheck() {
  const realEarnings = {
    daily: 0.005, // $0.005 per day
    monthly: 0.15, // $0.15 per month
    yearly: 1.8, // $1.80 per year
    coffeePrice: 3.5,
    timeForCoffee: 700, // days
  }

  return (
    <div className="space-y-6">
      {/* Truth Alert */}
      <Alert className="border-red-200 bg-red-50">
        <SafeIcon icon={AlertTriangle} className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>সত্য কথা:</strong> Crypto faucets দিয়ে কফি-কেক কেনার মতো টাকা আয় করা বাস্তবসম্মত নয়। এটি শুধুমাত্র শিক্ষামূলক এবং
          অভিজ্ঞতা অর্জনের জন্য।
        </AlertDescription>
      </Alert>

      {/* Real Earnings Breakdown */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800">
            <SafeIcon icon={DollarSign} className="w-5 h-5 mr-2" />
            বাস্তব আয়ের হিসাব
          </CardTitle>
          <CardDescription className="text-amber-700">Crypto faucets থেকে প্রকৃত আয়ের পরিমাণ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-sm text-amber-600">দৈনিক আয়</div>
              <div className="text-lg font-bold text-amber-800">${realEarnings.daily.toFixed(3)}</div>
              <Badge variant="secondary" className="text-xs">
                প্রতিদিন
              </Badge>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-sm text-amber-600">মাসিক আয়</div>
              <div className="text-lg font-bold text-amber-800">${realEarnings.monthly.toFixed(2)}</div>
              <Badge variant="secondary" className="text-xs">
                ৩০ দিনে
              </Badge>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-sm text-amber-600">বার্ষিক আয়</div>
              <div className="text-lg font-bold text-amber-800">${realEarnings.yearly.toFixed(2)}</div>
              <Badge variant="secondary" className="text-xs">
                ১ বছরে
              </Badge>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-sm text-amber-600">কফি কিনতে সময়</div>
              <div className="text-lg font-bold text-amber-800">{realEarnings.timeForCoffee} দিন</div>
              <Badge variant="destructive" className="text-xs">
                ২ বছর
              </Badge>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center text-red-800 mb-2">
              <SafeIcon icon={Coffee} className="w-4 h-4 mr-2" />
              <span className="font-medium">কফি কেনার বাস্তবতা</span>
            </div>
            <div className="text-sm text-red-700 space-y-1">
              <div>• কফির দাম: ${realEarnings.coffeePrice}</div>
              <div>• দৈনিক আয়: ${realEarnings.daily.toFixed(3)}</div>
              <div>• প্রয়োজনীয় সময়: {Math.ceil(realEarnings.coffeePrice / realEarnings.daily)} দিন</div>
              <div>• Gas fees: $5-20 (withdrawal এর জন্য)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Suggestions */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">বিকল্প পরামর্শ</CardTitle>
          <CardDescription className="text-green-700">কফি-কেক কেনার জন্য বাস্তবসম্মত উপায়</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center text-green-800">
              <SafeIcon icon={Clock} className="w-4 h-4 mr-2" />
              <span className="font-medium">দ্রুত আয়ের উপায়:</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1 ml-6">
              <li>• Freelancing (Fiverr, Upwork): দৈনিক $10-50</li>
              <li>• Online tutoring: ঘন্টায় $5-20</li>
              <li>• Content writing: প্রতি আর্টিকেল $5-25</li>
              <li>• Data entry: ঘন্টায় $3-8</li>
              <li>• Survey sites: দৈনিক $1-5</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Educational Value */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">শিক্ষামূলক মূল্য</CardTitle>
          <CardDescription className="text-blue-700">এই প্রজেক্ট থেকে যা শিখতে পারবেন</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Blockchain technology বোঝা</li>
            <li>• API integration শেখা</li>
            <li>• Real-time data handling</li>
            <li>• Database management</li>
            <li>• Full-stack development</li>
            <li>• Cryptocurrency ecosystem</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
