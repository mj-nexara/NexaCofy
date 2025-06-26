// Ethereum Mainnet Configuration for Real Coffee Equivalent Claims
export const ETHEREUM_MAINNET_CONFIG = {
  // Public RPC Endpoints (Free)
  rpcEndpoints: [
    "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY", // Alchemy (Recommended)
    "https://mainnet.infura.io/v3/YOUR_PROJECT_ID", // Infura
    "https://eth-mainnet.public.blastapi.io", // Blast (Free)
    "https://rpc.ankr.com/eth", // Ankr (Free)
    "https://ethereum.publicnode.com", // PublicNode (Free)
  ],

  // WebSocket Endpoints for Real-time
  wsEndpoints: [
    "wss://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY", // Alchemy WSS
    "wss://mainnet.infura.io/ws/v3/YOUR_PROJECT_ID", // Infura WSS
    "wss://eth-mainnet.ws.alchemy.com/v2/YOUR_API_KEY", // Alchemy WebSocket
  ],

  // Coffee Price Calculation
  coffeePrice: {
    averageUSD: 3.5, // Average coffee price in USD
    updateInterval: 60000, // Update every minute
    sources: [
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
      "https://api.coinmarketcap.com/v1/ticker/ethereum/",
    ],
  },

  // Mainnet Chain ID
  chainId: 1,
  networkName: "Ethereum Mainnet",
  currency: "ETH",
  blockExplorer: "https://etherscan.io",
}
