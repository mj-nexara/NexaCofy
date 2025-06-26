import { createPublicClient, http, webSocket, parseEther, formatEther } from "viem"
import { mainnet } from "viem/chains"

export class EthereumMainnetClient {
  private publicClient
  private wsClient
  private currentETHPrice = 0
  private coffeeEquivalentETH = 0

  constructor() {
    // Public client for reading blockchain data
    this.publicClient = createPublicClient({
      chain: mainnet,
      transport: http(
        process.env.ETHEREUM_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY,
      ),
    })

    // WebSocket client for real-time updates
    this.wsClient = createPublicClient({
      chain: mainnet,
      transport: webSocket(
        process.env.ETHEREUM_WSS_URL || "wss://eth-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY,
      ),
    })

    this.startRealTimePriceUpdates()
  }

  // Real-time ETH price updates
  private async startRealTimePriceUpdates() {
    setInterval(async () => {
      await this.updateETHPrice()
      this.calculateCoffeeEquivalent()
    }, 60000) // Update every minute

    // Initial update
    await this.updateETHPrice()
    this.calculateCoffeeEquivalent()
  }

  // Get current ETH price from multiple sources
  private async updateETHPrice() {
    try {
      // Primary source: CoinGecko
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      const data = await response.json()
      this.currentETHPrice = data.ethereum.usd

      console.log(`🔄 ETH Price Updated: $${this.currentETHPrice}`)
    } catch (error) {
      console.error("Failed to update ETH price:", error)
      // Fallback to CoinMarketCap
      try {
        const fallbackResponse = await fetch(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH",
          {
            headers: {
              "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY!,
            },
          },
        )
        const fallbackData = await fallbackResponse.json()
        this.currentETHPrice = fallbackData.data.ETH.quote.USD.price
      } catch (fallbackError) {
        console.error("Fallback price update failed:", fallbackError)
      }
    }
  }

  // Calculate coffee equivalent in ETH
  private calculateCoffeeEquivalent() {
    const coffeePrice = 3.5 // $3.50 average coffee price
    this.coffeeEquivalentETH = coffeePrice / this.currentETHPrice
    console.log(`☕ Coffee Equivalent: ${this.coffeeEquivalentETH.toFixed(8)} ETH ($${coffeePrice})`)
  }

  // Get current coffee equivalent amount
  public getCoffeeEquivalentETH(): number {
    return this.coffeeEquivalentETH
  }

  // Get current ETH price
  public getCurrentETHPrice(): number {
    return this.currentETHPrice
  }

  // Check wallet balance
  public async getWalletBalance(address: string): Promise<string> {
    try {
      const balance = await this.publicClient.getBalance({
        address: address as `0x${string}`,
      })
      return formatEther(balance)
    } catch (error) {
      console.error("Failed to get wallet balance:", error)
      return "0"
    }
  }

  // Get latest block number
  public async getLatestBlock(): Promise<bigint> {
    return await this.publicClient.getBlockNumber()
  }

  // Listen to real-time blocks
  public async subscribeToBlocks(callback: (blockNumber: bigint) => void) {
    const unwatch = this.wsClient.watchBlockNumber({
      onBlockNumber: callback,
    })
    return unwatch
  }

  // Get transaction details
  public async getTransaction(txHash: string) {
    try {
      return await this.publicClient.getTransaction({
        hash: txHash as `0x${string}`,
      })
    } catch (error) {
      console.error("Failed to get transaction:", error)
      return null
    }
  }

  // Estimate gas for transaction
  public async estimateGas(to: string, value: string) {
    try {
      return await this.publicClient.estimateGas({
        to: to as `0x${string}`,
        value: parseEther(value),
      })
    } catch (error) {
      console.error("Failed to estimate gas:", error)
      return BigInt(21000) // Default gas limit
    }
  }
}
