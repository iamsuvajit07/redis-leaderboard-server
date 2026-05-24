const Redis = require("ioredis");
const logger = require("../utils/logger");

const client = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD || undefined,
});

client.on("connect", () => logger.success("Redis connected"));
client.on("error", err => logger.error("Redis error:", err.message));
module.exports = client;
