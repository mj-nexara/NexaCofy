"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Clock, Smartphone, TrendingUp, Users } from "lucide-react"
import { SafeIcon } from "@/components/safe-icon"

const features = [
  {
    icon: Zap,
    title: "Automated Claims",
    description: "Set it and forget it. Our system automatically claims from all faucets every hour.",
    color: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Bank-level security with encrypted wallet storage and secure API connections.",
    color: "text-green-400",
  },
  {
    icon: Clock,
    title: "24/7 Operation",
    description: "Never miss a claim. Our servers run 24/7 to maximize your cryptocurrency earnings.",
    color: "text-blue-400",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Monitor your earnings and manage settings from any device, anywhere.",
    color: "text-purple-400",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Track your earnings, claim history, and optimize your cryptocurrency collection.",
    color: "text-cyan-400",
  },
  {
    icon: Users,
    title: "Student Focused",
    description: "Designed specifically for students to earn coffee money through cryptocurrency.",
    color: "text-pink-400",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose One Cup NexaCofy?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            The most advanced automated cryptocurrency faucet platform designed for students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center mb-4`}>
                    <SafeIcon icon={IconComponent} className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
