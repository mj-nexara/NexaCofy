import { RealityCheck } from "@/components/reality-check"

export default function RealityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">সত্য কথা - Crypto Faucets Reality</h1>
            <p className="text-xl text-gray-300">বাস্তব তথ্য এবং সৎ পরামর্শ</p>
          </div>

          <RealityCheck />
        </div>
      </div>
    </div>
  )
}
