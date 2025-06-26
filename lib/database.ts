import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export class RealDatabase {
  // Real user management
  async createUser(email: string, username: string, passwordHash: string) {
    const result = await sql`
      INSERT INTO users (email, username, password_hash, is_student, created_at)
      VALUES (${email}, ${username}, ${passwordHash}, true, NOW())
      RETURNING id, email, username, created_at
    `
    return result[0]
  }

  // Real wallet management
  async addUserWallet(userId: number, cryptocurrency: string, walletAddress: string) {
    const result = await sql`
      INSERT INTO wallets (user_id, cryptocurrency, wallet_address, created_at)
      VALUES (${userId}, ${cryptocurrency}, ${walletAddress}, NOW())
      ON CONFLICT (user_id, cryptocurrency) 
      DO UPDATE SET wallet_address = ${walletAddress}
      RETURNING *
    `
    return result[0]
  }

  // Real claim recording
  async recordClaim(userId: number, faucetId: number, amount: string, usdValue: number, txHash: string) {
    const result = await sql`
      INSERT INTO claims (user_id, faucet_id, amount, usd_value, status, transaction_id, claimed_at)
      VALUES (${userId}, ${faucetId}, ${amount}, ${usdValue}, 'completed', ${txHash}, NOW())
      RETURNING *
    `
    return result[0]
  }

  // Get real user claims
  async getUserClaims(userId: number) {
    const result = await sql`
      SELECT c.*, f.name as faucet_name, f.symbol, f.cryptocurrency
      FROM claims c
      JOIN faucets f ON c.faucet_id = f.id
      WHERE c.user_id = ${userId}
      ORDER BY c.claimed_at DESC
      LIMIT 50
    `
    return result
  }

  // Get user total earnings
  async getUserTotalEarnings(userId: number) {
    const result = await sql`
      SELECT 
        COUNT(*) as total_claims,
        SUM(usd_value) as total_usd_earned,
        COUNT(CASE WHEN claimed_at >= CURRENT_DATE THEN 1 END) as claims_today
      FROM claims 
      WHERE user_id = ${userId} AND status = 'completed'
    `
    return result[0]
  }

  // Check if user can claim (cooldown)
  async canUserClaim(userId: number, faucetId: number) {
    const result = await sql`
      SELECT claimed_at
      FROM claims
      WHERE user_id = ${userId} AND faucet_id = ${faucetId}
      ORDER BY claimed_at DESC
      LIMIT 1
    `

    if (result.length === 0) return true

    const lastClaim = new Date(result[0].claimed_at)
    const now = new Date()
    const hoursSinceLastClaim = (now.getTime() - lastClaim.getTime()) / (1000 * 60 * 60)

    return hoursSinceLastClaim >= 1 // 1 hour cooldown
  }
}
