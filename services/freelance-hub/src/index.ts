import express from "express"
import { FreelanceManager } from "./managers/FreelanceManager"
import { GigOptimizer } from "./optimizers/GigOptimizer"
import { PlatformConnector } from "./connectors/PlatformConnector"
import { logger } from "./utils/logger"

const app = express()
app.use(express.json())

class NexaraFreelanceHub {
  private manager: FreelanceManager
  private optimizer: GigOptimizer
  private connector: PlatformConnector

  constructor() {
    this.connector = new PlatformConnector()
    this.optimizer = new GigOptimizer()
    this.manager = new FreelanceManager(this.connector, this.optimizer)
  }

  async start() {
    try {
      await this.connector.initialize()
      await this.manager.start()

      logger.info("💼 Nexara Freelance Hub Started")
      logger.info("🎯 Platforms: Fiverr, Upwork, 99designs")
      logger.info("⚡ Target: $50-500 in 24h")
    } catch (error) {
      logger.error("Failed to start freelance hub:", error)
    }
  }
}

// API Routes
app.get("/status", (req, res) => {
  res.json({
    service: "Nexara Freelance Hub",
    status: "active",
    platforms: ["Fiverr", "Upwork", "99designs"],
    activeGigs: 0,
    todayEarnings: "$0",
  })
})

app.get("/opportunities", async (req, res) => {
  res.json({
    highPaying: [],
    quickTurnaround: [],
    skillMatch: [],
  })
})

app.post("/create-gig", async (req, res) => {
  res.json({
    success: true,
    gigId: "GIG_" + Date.now(),
    platform: req.body.platform,
    estimatedEarnings: "$50-200",
  })
})

const PORT = process.env.FREELANCE_PORT || 4002
const service = new NexaraFreelanceHub()

app.listen(PORT, async () => {
  logger.info(`💼 Freelance Hub running on port ${PORT}`)
  await service.start()
})
