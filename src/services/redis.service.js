const redis = require("../config/redis.config");

exports.incrementCounter = async key => {
    return redis.incr(key);
};

exports.incrementSortedSet = async (key, increment, member) => {
    return redis.zincrby(key, increment, member);
};

exports.getSortedSetRange = async (key, start, stop, withScores = false) => {
    return redis.zrevrange(
        key,
        start,
        stop,
        withScores ? "WITHSCORES" : undefined,
    );
};

exports.getSortedSetRank = async (key, member) => {
    return redis.zrevrank(key, member);
};

exports.getSortedSetScore = async (key, member) => {
    return redis.zscore(key, member);
};
