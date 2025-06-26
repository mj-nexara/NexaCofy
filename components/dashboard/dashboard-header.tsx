"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Settings } from "lucide-react"
import { useState } from "react"

export function DashboardHeader() {
  const [isAutoClaimActive, setIsAutoClaimActive] = useState(true)

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">NexaCofy Dashboard</h1>
        <p className="text-gray-400">Monitor your automated cryptocurrency claims</p>
      </div>

      <div className="flex items-center gap-4">
        <Badge
          variant={isAutoClaimActive ? "default" : "secondary"}
          className={`px-3 py-1 ${isAutoClaimActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
        >
          {isAutoClaimActive ? "Auto Claim Active" : "Auto Claim Paused"}
        </Badge>

        <Button
          variant="outline"
          onClick={() => setIsAutoClaimActive(!isAutoClaimActive)}
          className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
        >
          {isAutoClaimActive ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start
            </>
          )}
        </Button>

        <Button variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  )
}
