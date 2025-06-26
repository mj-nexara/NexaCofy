// Real crypto lending platforms (HIGH RISK)
export const CRYPTO_LOAN_PLATFORMS = {
  aave: {
    name: "Aave Protocol",
    type: "DeFi Lending",
    website: "https://aave.com",
    collateralRequired: "150-200%",
    interestRate: "2-15% APY",
    minLoan: "$100",
    maxLoan: "Depends on collateral",
    riskLevel: "HIGH",
    liquidationRisk: "YES - Can lose all collateral",
  },

  compound: {
    name: "Compound Finance",
    type: "DeFi Lending",
    website: "https://compound.finance",
    collateralRequired: "150%+",
    interestRate: "3-12% APY",
    minLoan: "$50",
    riskLevel: "HIGH",
    liquidationRisk: "YES",
  },

  binanceLoan: {
    name: "Binance Crypto Loan",
    type: "Centralized",
    website: "https://binance.com/en/loan",
    collateralRequired: "65-90%",
    interestRate: "7.5-36% APR",
    minLoan: "$10",
    maxLoan: "$2,000,000",
    riskLevel: "MEDIUM-HIGH",
    bangladeshStatus: "RESTRICTED",
  },

  kucoinLoan: {
    name: "KuCoin Lending",
    type: "Centralized",
    website: "https://kucoin.com",
    collateralRequired: "70%+",
    interestRate: "5-25% APR",
    riskLevel: "HIGH",
  },
}
