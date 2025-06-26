"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, Users, Target, Heart, Zap, TrendingUp } from "lucide-react"

export function NexaraSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-slate-800/50 to-purple-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-cyan-500 text-white px-4 py-2">
            The Nexara Way
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Collaborative Project for Students</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Building step by step a systematic, humanitarian, and technology-driven pathway that brings the concept of
            "One Cup NexaCofy for Every Student" to reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-amber-400" />
              </div>
              <CardTitle className="text-white">One Cup Philosophy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Earning cryptocurrency equivalent to a cup of coffee daily, leading students towards financial
                independence.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <CardTitle className="text-white">Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Creating a collaborative platform for all students under the Nexara project umbrella.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Systematic Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Using technology systematically to create automated earning opportunities.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Humanitarian Values</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Working for the welfare of all students based on humanitarian values.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Technology Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                24/7 automated cryptocurrency collection system using cutting-edge technology.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-pink-400" />
              </div>
              <CardTitle className="text-white">Future Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Creating a sustainable and growing financial pathway for the future.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
