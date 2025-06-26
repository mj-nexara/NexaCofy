#!/bin/bash

# Bitcoin Core Node Setup Script
echo "🚀 Setting up Bitcoin Core Node..."

# Check system requirements
echo "📋 Checking system requirements..."
echo "Required: 8GB RAM, 500GB+ storage, stable internet"

# Download Bitcoin Core
echo "📥 Downloading Bitcoin Core..."
wget https://bitcoincore.org/bin/bitcoin-core-25.0/bitcoin-25.0-x86_64-linux-gnu.tar.gz

# Extract and install
echo "📦 Installing Bitcoin Core..."
tar -xzf bitcoin-25.0-x86_64-linux-gnu.tar.gz
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-25.0/bin/*

# Create bitcoin directory
mkdir -p ~/.bitcoin

# Create bitcoin.conf
echo "⚙️ Creating configuration..."
cat > ~/.bitcoin/bitcoin.conf << EOL
# Bitcoin Core Configuration
server=1
daemon=1
rpcuser=bitcoinrpc
rpcpassword=$(openssl rand -hex 32)
rpcallowip=127.0.0.1
rpcport=8332

# Network settings
listen=1
maxconnections=125

# Pruning (to save disk space)
prune=50000

# Logging
debug=1
EOL

echo "✅ Bitcoin Core setup completed!"
echo "🔧 Start with: bitcoind -daemon"
echo "📊 Check status: bitcoin-cli getblockchaininfo"
