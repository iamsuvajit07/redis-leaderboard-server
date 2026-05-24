const Redis = require("ioredis");
require("dotenv").config();
const logger = require("../utils/logger");
const { PUBSUB_CHANNELS } = require("../constants");

const subscriber = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD || undefined,
});

subscriber.on("connect", () => logger.success("Subscriber connected to Redis"));
subscriber.on("error", err =>
    logger.error("Subscriber Redis error:", err.message),
);

const channels = Object.values(PUBSUB_CHANNELS);

(async () => {
    try {
        await subscriber.subscribe(...channels);
        logger.info(`Subscribed to channels: ${channels.join(", ")}`);
    } catch (err) {
        logger.error("Failed to subscribe:", err.message);
        process.exit(1);
    }
})();

subscriber.on("message", (channel, message) => {
    try {
        const data = JSON.parse(message);
        logger.info(`Event [${channel}]:`, JSON.stringify(data));
    } catch (err) {
        logger.info(`Event [${channel}]: ${message}`);
    }
});

process.on("SIGTERM", () => {
    logger.warn("SIGTERM signal received: closing subscriber");
    subscriber.disconnect();
    process.exit(0);
});

process.on("SIGINT", () => {
    logger.warn("SIGINT signal received: closing subscriber");
    subscriber.disconnect();
    process.exit(0);
});
