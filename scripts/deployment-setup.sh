#!/bin/bash

# CryptoFaucet Platform Deployment Setup Script
# This script sets up the production environment for automated claiming

echo "🚀 Setting up CryptoFaucet Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PM2 is installed globally
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 globally..."
    npm install -g pm2
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p data
mkdir -p backups

# Set up environment variables
echo "⚙️ Setting up environment variables..."
if [ ! -f .env ]; then
    cat > .env << EOL
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/cryptofaucet

# API Keys (Replace with actual keys)
BITCOIN_FAUCET_API_KEY=your_bitcoin_faucet_api_key
ETHEREUM_FAUCET_API_KEY=your_ethereum_faucet_api_key
RIPPLE_FAUCET_API_KEY=your_ripple_faucet_api_key
USDC_FAUCET_API_KEY=your_usdc_faucet_api_key

# Security
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_encryption_key_for_wallets

# Application Settings
BASE_URL=http://localhost:3000
NODE_ENV=production
PORT=3000

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Auto-Claim Settings
AUTO_CLAIM_ENABLED=true
CLAIM_INTERVAL_MINUTES=60
MAX_DAILY_CLAIMS=24
EOL
    echo "📝 Created .env file. Please update it with your actual configuration."
else
    echo "✅ .env file already exists."
fi

# Create PM2 ecosystem file
echo "⚙️ Creating PM2 ecosystem configuration..."
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [
    {
      name: 'cryptofaucet-web',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/web-error.log',
      out_file: './logs/web-out.log',
      log_file: './logs/web-combined.log',
      time: true
    },
    {
      name: 'cryptofaucet-autoclaim',
      script: './scripts/auto-claim-scheduler.js',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/autoclaim-error.log',
      out_file: './logs/autoclaim-out.log',
      log_file: './logs/autoclaim-combined.log',
      time: true,
      cron_restart: '0 0 * * *' // Restart daily at midnight
    }
  ]
};
EOL

# Build the Next.js application
echo "🔨 Building the application..."
npm run build

# Set up database (if PostgreSQL is available)
if command -v psql &> /dev/null; then
    echo "🗄️ Setting up database..."
    echo "Please run the following command to set up your database:"
    echo "psql -U your_username -d your_database -f scripts/database-setup.sql"
else
    echo "⚠️ PostgreSQL not found. Please set up your database manually using scripts/database-setup.sql"
fi

# Create systemd service (for Linux systems)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🔧 Creating systemd service..."
    sudo tee /etc/systemd/system/cryptofaucet.service > /dev/null << EOL
[Unit]
Description=CryptoFaucet Platform
After=network.target

[Service]
Type=forking
User=$USER
WorkingDirectory=$(pwd)
ExecStart=$(which pm2) start ecosystem.config.js
ExecReload=$(which pm2) reload ecosystem.config.js
ExecStop=$(which pm2) stop ecosystem.config.js
Restart=always

[Install]
WantedBy=multi-user.target
EOL

    echo "✅ Systemd service created. Enable it with:"
    echo "sudo systemctl enable cryptofaucet"
    echo "sudo systemctl start cryptofaucet"
fi

# Create backup script
echo "💾 Creating backup script..."
cat > scripts/backup.sh << 'EOL'
#!/bin/bash

# Backup script for CryptoFaucet Platform
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "📦 Creating backup: $DATE"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
if command -v pg_dump &> /dev/null; then
    echo "🗄️ Backing up database..."
    pg_dump $DATABASE_URL > "$BACKUP_DIR/database_$DATE.sql"
fi

# Backup configuration files
echo "⚙️ Backing up configuration..."
tar -czf "$BACKUP_DIR/config_$DATE.tar.gz" .env ecosystem.config.js

# Backup logs
echo "📋 Backing up logs..."
tar -czf "$BACKUP_DIR/logs_$DATE.tar.gz" logs/

# Clean old backups (keep last 7 days)
find "$BACKUP_DIR" -name "*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup completed: $BACKUP_DIR"
EOL

chmod +x scripts/backup.sh

# Create monitoring script
echo "📊 Creating monitoring script..."
cat > scripts/monitor.sh << 'EOL'
#!/bin/bash

# Monitoring script for CryptoFaucet Platform

echo "🔍 CryptoFaucet Platform Status"
echo "================================"

# Check PM2 processes
echo "📊 PM2 Processes:"
pm2 list

echo ""
echo "💾 System Resources:"
echo "Memory Usage: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
echo "Disk Usage: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 ")"}')"
echo "CPU Load: $(uptime | awk -F'load average:' '{print $2}')"

echo ""
echo "🌐 Application Health:"
curl -s -o /dev/null -w "Web App: %{http_code}\n" http://localhost:3000/api/health

echo ""
echo "📈 Recent Claims (last 10):"
tail -n 10 logs/autoclaim-out.log | grep "Successfully claimed" || echo "No recent claims found"

echo ""
echo "❌ Recent Errors:"
tail -n 5 logs/autoclaim-error.log 2>/dev/null || echo "No recent errors"
EOL

chmod +x scripts/monitor.sh

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your actual configuration"
echo "2. Set up your database using: psql -U username -d database -f scripts/database-setup.sql"
echo "3. Start the application: pm2 start ecosystem.config.js"
echo "4. Monitor the application: ./scripts/monitor.sh"
echo "5. Set up daily backups: crontab -e and add: 0 2 * * * /path/to/scripts/backup.sh"
echo ""
echo "🔗 Access your application at: http://localhost:3000"
echo "📊 Monitor with PM2: pm2 monit"
echo ""
