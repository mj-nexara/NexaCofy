"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"
import { ClientSafeWrapper } from "@/components/client-safe-wrapper"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ClientSafeWrapper>
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="The Nexara Way Logo"
                width={40}
                height={40}
                className="w-10 h-10"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">The Nexara Way</span>
                <span className="text-xs text-amber-400">One Cup NexaCofy</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/wallet" className="text-gray-300 hover:text-white transition-colors">
                My Wallet
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About Nexara
              </Link>
              <Button
                variant="outline"
                className="bg-transparent border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
              >
                <Zap className="w-4 h-4 mr-2" />
                Auto Claim
              </Button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden py-4 space-y-4">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/wallet" className="block text-gray-300 hover:text-white transition-colors">
                My Wallet
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Nexara
              </Link>
            </div>
          )}
        </div>
      </nav>
    </ClientSafeWrapper>
  )
}
