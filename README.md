# ☕ One Cup NexaCofy - The Nexara Way

**One Cup NexaCofy for Every Student** - A collaborative cryptocurrency project for students

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://onecupnexacofy.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/MJ-Nexara/One_Cup_NexaCofy.git)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## 🎯 Project Mission

**The Nexara Way** is a systematic, humanitarian, and technology-driven pathway that brings the concept of "One Cup NexaCofy for Every Student" to reality. Our goal is to provide daily cryptocurrency earnings equivalent to a cup of coffee for every student.

## ✨ Features

### 🤖 Automated Cryptocurrency Collection
- **Bitcoin (BTC)**: 0.00001 BTC/hour
- **Ethereum (ETH)**: 0.0001 ETH/hour  
- **Ripple (XRP)**: 0.1 XRP/hour
- **USDC**: 0.05 USDC/hour

### 💼 Wallet Management
- Secure cryptocurrency wallet storage
- Real-time balance tracking
- Easy withdrawal system
- Transaction history

### 📊 Dashboard
- Live earnings statistics
- Auto-claim settings
- Daily/monthly reports
- Portfolio tracking

## 🚀 Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/MJ-Nexara/One_Cup_NexaCofy.git

# Navigate to project directory
cd One_Cup_NexaCofy

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
\`\`\`

### Environment Variables

Set the following variables in your `.env` file:

\`\`\`env
# Application Settings
BASE_URL=http://localhost:3000
NODE_ENV=development
PORT=3000

# Database (Optional for development)
DATABASE_URL=postgresql://localhost:5432/nexacofy

# API Keys (Required for production)
BITCOIN_FAUCET_API_KEY=your_api_key
ETHEREUM_FAUCET_API_KEY=your_api_key
RIPPLE_FAUCET_API_KEY=your_api_key
USDC_FAUCET_API_KEY=your_api_key

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
\`\`\`

### Local Development Commands

\`\`\`bash
# Start development server
npm run dev

# Or build for production
npm run build
npm start

# Run auto-claim system separately
npm run auto-claim

# Run auto-claim with PM2 (Production)
npm run auto-claim:pm2
\`\`\`

### 🌐 Access URLs
- **Local Development**: http://localhost:3000
- **Production**: https://onecupnexacofy.vercel.app

## 🏗️ Vercel Deployment

### Deploy from GitHub

1. Go to **Vercel Dashboard**
2. Click **New Project**
3. Import GitHub repository: `https://github.com/MJ-Nexara/One_Cup_NexaCofy.git`
4. Set environment variables:
   \`\`\`
   BASE_URL=https://onecupnexacofy.vercel.app
   NODE_ENV=production
   \`\`\`
5. Click **Deploy**

### Manual Deploy

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
\`\`\`

## 💰 Cryptocurrency Storage & Withdrawal

### Where are earnings stored?
1. **Dashboard Wallet**: Separate wallet for each cryptocurrency
2. **Real-time Balance**: Live balance updates
3. **Secure Storage**: Encrypted wallet addresses

### How to withdraw?
1. Go to **Dashboard → My Wallet**
2. Navigate to **Withdraw Funds** section
3. Select cryptocurrency and amount
4. Enter your wallet address
5. Click **Withdraw Now**

### Minimum Withdrawal Amounts
- **Bitcoin**: 0.0001 BTC
- **Ethereum**: 0.001 ETH  
- **Ripple**: 1 XRP
- **USDC**: 1 USDC

## 🛠️ Technical Details

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/UI** - UI components

### Backend
- **Next.js API Routes** - Server-side logic
- **Node.js** - Auto-claim scheduler
- **PostgreSQL** - Database (optional)
- **PM2** - Process management

### Auto-Claim System
- **Cron Jobs** - Scheduled claiming
- **Retry Logic** - Error handling
- **24/7 Operation** - Continuous running
- **Multi-faucet Support** - Multiple sources

## 📁 Project Structure

\`\`\`
One_Cup_NexaCofy/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── wallet/           # Wallet management
│   ├── about/            # About Nexara
│   └── api/              # API routes
├── components/            # React components
│   ├── dashboard/        # Dashboard components
│   ├── wallet/          # Wallet components
│   └── ui/              # UI components
├── scripts/              # Automation scripts
│   ├── auto-claim-scheduler.js
│   ├── database-setup.sql
│   └── deployment-setup.sh
├── public/               # Static assets
└── README.md            # This file
\`\`\`

## 🔧 Production Setup

### Automated Setup
\`\`\`bash
# Run setup script
npm run setup
\`\`\`

### Manual Setup
\`\`\`bash
# Install PM2
npm install -g pm2

# Build application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Enable auto-start
pm2 startup
pm2 save
\`\`\`

## 📊 Monitoring

### Application Status
\`\`\`bash
# Check PM2 status
pm2 list

# View logs
pm2 logs

# Monitoring dashboard
pm2 monit
\`\`\`

### Custom Monitoring
\`\`\`bash
# Run monitor script
./scripts/monitor.sh
\`\`\`

## 🔒 Security

- **Encrypted Wallets**: All wallet addresses are encrypted
- **Secure API**: JWT authentication
- **Rate Limiting**: API abuse prevention
- **Input Validation**: All inputs are validated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📞 Support

- **GitHub Issues**: [Create Issue](https://github.com/MJ-Nexara/One_Cup_NexaCofy/issues)
- **Email**: nexara.support@example.com
- **Website**: https://onecupnexacofy.vercel.app

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nexara Team** - Project development and management
- **Open Source Community** - Various tools and libraries
- **Students Community** - Feedback and support

---

**The Nexara Way** - Building step by step a systematic, humanitarian, and technology-driven pathway

**One Cup NexaCofy for Every Student** ☕️ 🚀
