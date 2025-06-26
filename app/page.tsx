import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FaucetGrid } from "@/components/faucet-grid"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { NexaraSection } from "@/components/nexara-section"
import { ClientSafeWrapper } from "@/components/client-safe-wrapper"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ClientSafeWrapper
        fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />}
      >
        <HeroSection />
        <NexaraSection />
        <Suspense
          fallback={
            <div className="py-16 px-4">
              <div className="container mx-auto text-center text-white">Loading...</div>
            </div>
          }
        >
          <StatsSection />
        </Suspense>
        <FaucetGrid />
        <FeaturesSection />
      </ClientSafeWrapper>
    </div>
  )
}
