import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ClaimingStats } from "@/components/dashboard/claiming-stats"
import { AutoClaimSettings } from "@/components/dashboard/auto-claim-settings"
import { RecentClaims } from "@/components/dashboard/recent-claims"
import { WalletManagement } from "@/components/dashboard/wallet-management"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<div>Loading stats...</div>}>
              <ClaimingStats />
            </Suspense>
            <AutoClaimSettings />
            <RecentClaims />
          </div>
          <div className="space-y-6">
            <WalletManagement />
          </div>
        </div>
      </div>
    </div>
  )
}
