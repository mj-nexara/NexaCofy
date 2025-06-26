import { NextResponse } from "next/server"

// Database connection utility
// In production, use a proper database connection pool
class DatabaseManager {
  private static instance: DatabaseManager
  private connectionString: string

  private constructor() {
    this.connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/cryptofaucet"
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }
    return DatabaseManager.instance
  }

  async query(sql: string, params: any[] = []) {
    // In a real application, use a proper PostgreSQL client like 'pg'
    // For demo purposes, we'll simulate database operations
    console.log("Executing query:", sql, params)

    // Simulate database response
    return {
      rows: [],
      rowCount: 0,
    }
  }

  async getUserClaims(userId: number) {
    const sql = `
      SELECT c.*, f.name as faucet_name, f.symbol
      FROM claims c
      JOIN faucets f ON c.faucet_id = f.id
      WHERE c.user_id = $1
      ORDER BY c.claimed_at DESC
      LIMIT 50
    `
    return this.query(sql, [userId])
  }

  async createClaim(userId: number, faucetId: number, walletId: number, amount: number, usdValue: number) {
    const sql = `
      INSERT INTO claims (user_id, faucet_id, wallet_id, amount, usd_value, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `
    return this.query(sql, [userId, faucetId, walletId, amount, usdValue])
  }

  async updateClaimStatus(claimId: number, status: string, transactionId?: string) {
    const sql = `
      UPDATE claims 
      SET status = $2, transaction_id = $3, completed_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `
    return this.query(sql, [claimId, status, transactionId])
  }

  async getUserAutoClaimSettings(userId: number) {
    const sql = `
      SELECT * FROM auto_claim_settings WHERE user_id = $1
    `
    return this.query(sql, [userId])
  }

  async updateAutoClaimSettings(userId: number, settings: any) {
    const sql = `
      INSERT INTO auto_claim_settings (user_id, is_enabled, claim_interval_minutes, daily_claim_limit, email_notifications, enabled_faucets)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        is_enabled = $2,
        claim_interval_minutes = $3,
        daily_claim_limit = $4,
        email_notifications = $5,
        enabled_faucets = $6,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    return this.query(sql, [
      userId,
      settings.isEnabled,
      settings.claimIntervalMinutes,
      settings.dailyClaimLimit,
      settings.emailNotifications,
      JSON.stringify(settings.enabledFaucets),
    ])
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")
    const userId = searchParams.get("userId")

    const db = DatabaseManager.getInstance()

    switch (action) {
      case "user-claims":
        if (!userId) {
          return NextResponse.json({ error: "User ID required" }, { status: 400 })
        }
        const claims = await db.getUserClaims(Number.parseInt(userId))
        return NextResponse.json({ success: true, claims: claims.rows })

      case "auto-claim-settings":
        if (!userId) {
          return NextResponse.json({ error: "User ID required" }, { status: 400 })
        }
        const settings = await db.getUserAutoClaimSettings(Number.parseInt(userId))
        return NextResponse.json({ success: true, settings: settings.rows[0] })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, userId, ...data } = body

    const db = DatabaseManager.getInstance()

    switch (action) {
      case "create-claim":
        const claim = await db.createClaim(userId, data.faucetId, data.walletId, data.amount, data.usdValue)
        return NextResponse.json({ success: true, claim: claim.rows[0] })

      case "update-claim-status":
        const updatedClaim = await db.updateClaimStatus(data.claimId, data.status, data.transactionId)
        return NextResponse.json({ success: true, claim: updatedClaim.rows[0] })

      case "update-auto-claim-settings":
        const updatedSettings = await db.updateAutoClaimSettings(userId, data.settings)
        return NextResponse.json({ success: true, settings: updatedSettings.rows[0] })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
