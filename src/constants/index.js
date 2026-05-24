exports.REDIS_KEYS = {
    POST_VIEWS: postId => `post:${postId}:views`,
    LEADERBOARD: "leaderboard",
};

exports.PUBSUB_CHANNELS = {
    LEADERBOARD_UPDATES: "leaderboard-updates",
    POST_VIEWS: "post-views",
};

exports.LIMITS = {
    MAX_LEADERBOARD_SIZE: 10,
    MIN_USER_ID_LENGTH: 1,
    MAX_USER_ID_LENGTH: 50,
    MIN_SCORE: -Infinity,
    MAX_SCORE: Infinity,
};
