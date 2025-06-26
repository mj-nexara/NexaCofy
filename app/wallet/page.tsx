import { WalletDashboard } from "@/components/wallet/wallet-dashboard"
import { WithdrawalSection } from "@/components/wallet/withdrawal-section"
import { TransactionHistory } from "@/components/wallet/transaction-history"

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My NexaCofy Wallet</h1>
          <p className="text-gray-400">Manage your cryptocurrency assets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WalletDashboard />
            <WithdrawalSection />
          </div>
          <div>
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  )
}
