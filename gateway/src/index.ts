import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { authRouter } from "./routes/auth"
import { proxyRouter } from "./routes/proxy"
import { healthRouter } from "./routes/health"
import { errorHandler } from "./middleware/errorHandler"
import { logger } from "./utils/logger"

const app = express()

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
})
app.use(limiter)

// Body parsing
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRouter)
app.use("/api/health", healthRouter)
app.use("/api", proxyRouter)

// Error handling
app.use(errorHandler)

const PORT = process.env.GATEWAY_PORT || 4000

app.listen(PORT, () => {
  logger.info(`🚀 Nexara Gateway running on port ${PORT}`)
  logger.info(`🌟 Advanced Financial Technology Ecosystem`)
  logger.info(`💼 Services: Arbitrage | Freelance | Flash Loans | Donations`)
})

export default app
