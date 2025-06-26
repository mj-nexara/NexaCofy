#!/bin/bash

echo "🚀 Setting up Nexara Financial Ecosystem"
echo "========================================="

# Create directory structure
mkdir -p services/{arbitrage-engine,freelance-hub,flash-loans,donation-platform}/src
mkdir -p shared/{ui-components,database}/src
mkdir -p gateway/src

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Setup environment
echo "🔧 Setting up environment..."
cp .env.example .env.local

# Build shared components
echo "🏗️ Building shared components..."
npm run build:shared

# Setup database
echo "🗄️ Setting up database..."
npm run db:setup

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Configure your API keys in .env.local"
echo "2. Run: npm run dev"
echo "3. Access services:"
echo "   - Gateway: http://localhost:4000"
echo "   - Arbitrage: http://localhost:4001"
echo "   - Freelance: http://localhost:4002"
echo "   - Flash Loans: http://localhost:4003"
echo "   - Donations: http://localhost:4004"
