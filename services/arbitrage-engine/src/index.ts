import express from "express"
import { ArbitrageEngine } from "./engine/ArbitrageEngine"
import { ExchangeManager } from "./exchanges/ExchangeManager"
import { PriceMonitor } from "./monitors/PriceMonitor"
import { RiskManager } from "./risk/RiskManager"
import { logger } from "./utils/logger"

const app = express()
app.use(express.json())

class NexaraArbitrageService {
  private engine: ArbitrageEngine
  private exchangeManager: ExchangeManager
  private priceMonitor: PriceMonitor
  private riskManager: RiskManager

  constructor() {
    this.exchangeManager = new ExchangeManager()
    this.riskManager = new RiskManager()
    this.priceMonitor = new PriceMonitor(this.exchangeManager)
    this.engine = new ArbitrageEngine(this.exchangeManager, this.riskManager)
  }

  async start() {
    try {
      await this.exchangeManager.initialize()
      await this.priceMonitor.start()
      await this.engine.start()

      logger.info("🔄 Nexara Arbitrage Engine Started")
      logger.info("📊 Monitoring price differences across exchanges")
      logger.info("💰 Target profit: 0.5-2% per trade")
    } catch (error) {
      logger.error("Failed to start arbitrage engine:", error)
    }
  }

  async stop() {
    await this.engine.stop()
    await this.priceMonitor.stop()
    logger.info("⏹️ Arbitrage Engine Stopped")
  }
}

// API Routes
app.get("/status", (req, res) => {
  res.json({
    service: "Nexara Arbitrage Engine",
    status: "running",
    uptime: process.uptime(),
    exchanges: ["Binance", "KuCoin", "Gate.io"],
    targetProfit: "0.5-2%",
  })
})

app.get("/opportunities", async (req, res) => {
  // Return current arbitrage opportunities
  res.json({
    opportunities: [],
    lastUpdate: new Date().toISOString(),
  })
})

app.post("/execute", async (req, res) => {
  // Execute arbitrage trade
  res.json({
    success: true,
    tradeId: "ARB_" + Date.now(),
    estimatedProfit: "1.2%",
  })
})

const PORT = process.env.ARBITRAGE_PORT || 4001
const service = new NexaraArbitrageService()

app.listen(PORT, async () => {
  logger.info(`🔄 Arbitrage Engine running on port ${PORT}`)
  await service.start()
})

process.on("SIGTERM", async () => {
  await service.stop()
  process.exit(0)
})
