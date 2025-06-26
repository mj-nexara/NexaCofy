"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Coins, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ClientSafeWrapper } from "@/components/client-safe-wrapper"

export function HeroSection() {
  return (
    <ClientSafeWrapper>
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />

        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="The Nexara Way - Coffee and Crypto Icon"
                width={120}
                height={120}
                className="animate-pulse"
                priority
              />
              <div className="absolute -top-2 -right-2">
                <Coins className="h-8 w-8 text-cyan-400 animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
              The Nexara Way
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">One Cup NexaCofy for Every Student</h2>

          <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            <span className="text-cyan-400 font-semibold">
              A systematic, humanitarian, and technology-driven pathway
            </span>
          </p>

          <p className="text-md md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Automatically collect cryptocurrency every hour. Bitcoin, Ethereum, Ripple, and USDC -
            <span className="text-amber-400 font-semibold"> equivalent to a cup of coffee!</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-600 hover:to-cyan-600 text-white px-8 py-3"
              >
                <Image
                  src="/placeholder.svg?height=20&width=20"
                  alt="Nexara Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Start The Nexara Way
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
            >
              <Zap className="mr-2 h-5 w-5" />
              View Auto Claims
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { name: "Bitcoin", symbol: "BTC", amount: "0.00001", color: "text-orange-400" },
              { name: "Ethereum", symbol: "ETH", amount: "0.0001", color: "text-blue-400" },
              { name: "Ripple", symbol: "XRP", amount: "0.1", color: "text-cyan-400" },
              { name: "USDC", symbol: "USDC", amount: "0.05", color: "text-green-400" },
            ].map((crypto) => (
              <div
                key={crypto.symbol}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700"
              >
                <div className={`${crypto.color} font-semibold`}>{crypto.symbol}</div>
                <div className="text-white text-sm">{crypto.amount}/hour</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ClientSafeWrapper>
  )
}
