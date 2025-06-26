module.exports = {
  apps: [
    {
      name: "nexara-gateway",
      script: "gateway/dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
    {
      name: "nexara-arbitrage",
      script: "services/arbitrage-engine/dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 4001,
      },
    },
    {
      name: "nexara-freelance",
      script: "services/freelance-hub/dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 4002,
      },
    },
    {
      name: "nexara-flashloans",
      script: "services/flash-loans/dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 4003,
      },
    },
    {
      name: "nexara-donations",
      script: "services/donation-platform/dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 4004,
      },
    },
  ],
}
