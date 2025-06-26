import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, Users, Target, Heart, Zap, TrendingUp, Github, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-cyan-500 text-white px-4 py-2">
            The Nexara Way
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Nexara</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collaborative project for students that shows the path to financial independence through technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                <strong className="text-amber-400">One Cup NexaCofy for Every Student</strong> - Through this slogan, we
                want to provide daily cryptocurrency earnings equivalent to a cup of coffee for every student.
              </p>
              <p>
                Our goal is to create an automated system with the help of technology that will reduce the financial
                pressure on students and help them focus on their studies.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">The Nexara Way</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                <strong className="text-cyan-400">Systematic, Humanitarian, and Technology-driven pathway</strong> - We
                operate our project based on these three principles.
              </p>
              <ul className="space-y-2">
                <li>
                  • <strong>Systematic:</strong> Methodical and planned approach
                </li>
                <li>
                  • <strong>Humanitarian:</strong> Working for everyone's welfare
                </li>
                <li>
                  • <strong>Technology-driven:</strong> Maximum use of modern technology
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Coffee,
              title: "Daily Coffee Fund",
              description: "Daily cryptocurrency earnings equivalent to a cup of coffee",
              color: "text-amber-400",
            },
            {
              icon: Zap,
              title: "Auto Claims",
              description: "24/7 automated cryptocurrency collection",
              color: "text-yellow-400",
            },
            {
              icon: Users,
              title: "Community Support",
              description: "Collaborative student community",
              color: "text-cyan-400",
            },
            {
              icon: Target,
              title: "Systematic Approach",
              description: "Planned and methodical approach",
              color: "text-purple-400",
            },
            {
              icon: Heart,
              title: "Humanitarian Values",
              description: "Work based on humanitarian values",
              color: "text-pink-400",
            },
            {
              icon: TrendingUp,
              title: "Future Growth",
              description: "Sustainable pathway for the future",
              color: "text-green-400",
            },
          ].map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
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

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join The Nexara Way</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://github.com/MJ-Nexara/One_Cup_NexaCofy.git" target="_blank">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub Repository
              </Button>
            </Link>
            <Link href="https://onecupnexacofy.vercel.app" target="_blank">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-600 hover:to-cyan-600"
              >
                <Globe className="w-5 h-5 mr-2" />
                Visit Live Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
