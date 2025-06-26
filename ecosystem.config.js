module.exports = {
  apps: [
    {
      name: "nexacofy-web",
      script: "npm",
      args: "start",
      cwd: "./",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/web-error.log",
      out_file: "./logs/web-out.log",
      log_file: "./logs/web-combined.log",
      time: true,
    },
    {
      name: "nexacofy-autoclaim",
      script: "./scripts/auto-claim-scheduler.js",
      cwd: "./",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
      error_file: "./logs/autoclaim-error.log",
      out_file: "./logs/autoclaim-out.log",
      log_file: "./logs/autoclaim-combined.log",
      time: true,
      cron_restart: "0 0 * * *", // Restart daily at midnight
    },
  ],
}
