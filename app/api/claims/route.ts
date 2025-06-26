import { NextResponse } from "next/server"

// Mock data for demonstration
const mockClaims = [
  {
    id: 1,
    crypto: "Bitcoin",
    symbol: "BTC",
    amount: "0.00001",
    usdValue: 0.43,
    status: "completed",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    crypto: "Ripple",
    symbol: "XRP",
    amount: "0.1",
    usdValue: 0.06,
    status: "completed",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
]

export async function GET() {
  try {
    // In a real application, this would fetch from a database
    return NextResponse.json({
      success: true,
      claims: mockClaims,
      totalEarnings: {
        btc: "0.00045",
        eth: "0.0023",
        xrp: "12.5",
        usdc: "2.34",
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch claims" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { crypto, amount, walletAddress } = await request.json()

    // In a real application, this would:
    // 1. Validate the request
    // 2. Check claim eligibility
    // 3. Process the claim with the faucet API
    // 4. Update the database
    // 5. Send cryptocurrency to the wallet

    const newClaim = {
      id: Date.now(),
      crypto,
      amount,
      status: "pending",
      timestamp: new Date().toISOString(),
      walletAddress,
    }

    // Simulate processing delay
    setTimeout(() => {
      // Update claim status to completed
      console.log(`Claim processed: ${crypto} ${amount}`)
    }, 5000)

    return NextResponse.json({
      success: true,
      claim: newClaim,
      message: `Successfully claimed ${amount} ${crypto}`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process claim" }, { status: 500 })
  }
}
