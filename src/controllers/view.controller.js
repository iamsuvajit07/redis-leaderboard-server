const redisService = require("../services/redis.service");
const pubsubService = require("../services/pubsub.service");
const logger = require("../utils/logger");
const { sanitizeInput } = require("../utils/validators");
const { REDIS_KEYS, PUBSUB_CHANNELS } = require("../constants");

exports.incrementView = async (req, res) => {
    const { id } = req.params;
    const sanitizedId = sanitizeInput(id);
    const views = await redisService.incrementCounter(REDIS_KEYS.POST_VIEWS(sanitizedId));

    await pubsubService.publish(PUBSUB_CHANNELS.POST_VIEWS, {
        postId: sanitizedId,
        views: Number(views),
        time: new Date().toISOString(),
    });

    logger.info(`View incremented for post ${sanitizedId}: ${views}`);
    res.json({ postId: sanitizedId, views: Number(views) });
};
