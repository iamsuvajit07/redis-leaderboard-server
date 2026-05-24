const redis = require("../config/redis.config");

exports.publish = async (channel, message) => {
    return redis.publish(channel, JSON.stringify(message));
};
