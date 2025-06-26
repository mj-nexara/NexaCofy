-- Database setup for CryptoFaucet Platform
-- Run this script to create the necessary tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_student BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    cryptocurrency VARCHAR(10) NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    private_key_encrypted TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, cryptocurrency)
);

-- Faucets table
CREATE TABLE IF NOT EXISTS faucets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cryptocurrency VARCHAR(10) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    api_url VARCHAR(255),
    reward_amount DECIMAL(18, 8) NOT NULL,
    claim_interval_minutes INTEGER DEFAULT 60,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Claims table
CREATE TABLE IF NOT EXISTS claims (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    faucet_id INTEGER REFERENCES faucets(id) ON DELETE CASCADE,
    wallet_id INTEGER REFERENCES wallets(id) ON DELETE CASCADE,
    amount DECIMAL(18, 8) NOT NULL,
    usd_value DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pending',
    transaction_id VARCHAR(255),
    network_fee DECIMAL(18, 8) DEFAULT 0,
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT
);

-- Auto claim settings table
CREATE TABLE IF NOT EXISTS auto_claim_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    is_enabled BOOLEAN DEFAULT true,
    claim_interval_minutes INTEGER DEFAULT 60,
    daily_claim_limit INTEGER DEFAULT 24,
    email_notifications BOOLEAN DEFAULT false,
    enabled_faucets JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
    id SERIAL PRIMARY KEY,
    referrer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    referred_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    commission_rate DECIMAL(5, 4) DEFAULT 0.1000,
    total_earned DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(referrer_id, referred_id)
);

-- System stats table
CREATE TABLE IF NOT EXISTS system_stats (
    id SERIAL PRIMARY KEY,
    stat_date DATE DEFAULT CURRENT_DATE,
    total_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    total_claims INTEGER DEFAULT 0,
    total_distributed_usd DECIMAL(12, 2) DEFAULT 0,
    auto_claims_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(stat_date)
);

-- Insert default faucets
INSERT INTO faucets (name, cryptocurrency, symbol, reward_amount, claim_interval_minutes) VALUES
('Bitcoin Faucet', 'Bitcoin', 'BTC', 0.00001000, 60),
('Ethereum Faucet', 'Ethereum', 'ETH', 0.00010000, 60),
('Ripple Faucet', 'Ripple', 'XRP', 0.10000000, 60),
('USDC Faucet', 'USDC', 'USDC', 0.05000000, 60);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_claims_user_id ON claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_claimed_at ON claims(claimed_at);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_auto_claim_settings_user_id ON auto_claim_settings(user_id);

-- Insert sample user for testing
INSERT INTO users (email, username, password_hash, is_student) VALUES
('student@example.com', 'student_user', '$2b$10$example_hash', true);

-- Insert sample wallet addresses for the test user
INSERT INTO wallets (user_id, cryptocurrency, wallet_address) VALUES
(1, 'BTC', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'),
(1, 'ETH', '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4'),
(1, 'XRP', 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH'),
(1, 'USDC', '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4');

-- Insert default auto-claim settings for test user
INSERT INTO auto_claim_settings (user_id, enabled_faucets) VALUES
(1, '["BTC", "ETH", "XRP", "USDC"]');

-- Create a view for user dashboard stats
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT 
    u.id as user_id,
    u.username,
    COUNT(c.id) as total_claims,
    SUM(CASE WHEN c.status = 'completed' THEN c.usd_value ELSE 0 END) as total_earned_usd,
    COUNT(CASE WHEN c.claimed_at >= CURRENT_DATE THEN 1 END) as claims_today,
    MAX(c.claimed_at) as last_claim_time
FROM users u
LEFT JOIN claims c ON u.id = c.user_id
GROUP BY u.id, u.username;
