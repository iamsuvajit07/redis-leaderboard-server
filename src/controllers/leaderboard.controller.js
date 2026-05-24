const leaderboardService = require("../services/leaderboard.service");
const pubsubService = require("../services/pubsub.service");
const logger = require("../utils/logger");
const { sanitizeInput } = require("../utils/validators");
const { PUBSUB_CHANNELS } = require("../constants");

exports.addScore = async (req, res) => {
    const { userId, score } = req.body;
    const sanitizedUserId = sanitizeInput(userId);
    const newScore = await leaderboardService.addOrUpdateScore(sanitizedUserId, score);

    await pubsubService.publish(PUBSUB_CHANNELS.LEADERBOARD_UPDATES, {
        userId: sanitizedUserId,
        score: newScore,
        time: new Date().toISOString(),
    });

    logger.info(`Score added for user ${sanitizedUserId}: ${newScore}`);
    res.json({ userId: sanitizedUserId, newScore });
};

exports.getTopLeaderboard = async (req, res) => {
    const leaderboard = await leaderboardService.getTopUsers(10);
    res.json(leaderboard);
};

exports.getUserRank = async (req, res) => {
    const { userid } = req.params;
    const rankData = await leaderboardService.getUserRank(userid);

    if (!rankData) {
        return res.status(404).json({ error: "User not found in leaderboard" });
    }

    res.json(rankData);
};
