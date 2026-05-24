const redisService = require("./redis.service");
const { REDIS_KEYS, LIMITS } = require("../constants");

exports.addOrUpdateScore = async (userId, score) => {
    const newScore = await redisService.incrementSortedSet(
        REDIS_KEYS.LEADERBOARD,
        score,
        userId,
    );
    return parseFloat(newScore);
};

exports.getTopUsers = async (limit = LIMITS.MAX_LEADERBOARD_SIZE) => {
    const result = await redisService.getSortedSetRange(
        REDIS_KEYS.LEADERBOARD,
        0,
        limit - 1,
        true,
    );
    const leaderboard = [];

    for (let i = 0; i < result.length; i += 2) {
        leaderboard.push({
            rank: i / 2 + 1,
            userId: result[i],
            score: parseFloat(result[i + 1]),
        });
    }

    return leaderboard;
};

exports.getUserRank = async userId => {
    const rank = await redisService.getSortedSetRank(REDIS_KEYS.LEADERBOARD, userId);
    if (rank === null) {
        return null;
    }

    const score = await redisService.getSortedSetScore(REDIS_KEYS.LEADERBOARD, userId);
    return {
        userId,
        rank: rank + 1,
        score: parseFloat(score),
    };
};
