"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Coins, Clock } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

const stats = [
  {
    title: "Total Claims Today",
    value: "2,847",
    change: "+12.5%",
    icon: Coins,
    color: "text-cyan-400",
  },
  {
    title: "Active Students",
    value: "1,234",
    change: "+8.2%",
    icon: Users,
    color: "text-purple-400",
  },
  {
    title: "Auto Claims/Hour",
    value: "156",
    change: "+15.3%",
    icon: Clock,
    color: "text-green-400",
  },
  {
    title: "Total Distributed",
    value: "$12,456",
    change: "+22.1%",
    icon: TrendingUp,
    color: "text-yellow-400",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                  <SafeIcon icon={IconComponent} className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-green-400">{stat.change} from last hour</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
