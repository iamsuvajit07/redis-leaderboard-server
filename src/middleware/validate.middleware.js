exports.validateScoreRequest = (req, res, next) => {
    const { userId, score } = req.body;

    if (!userId || typeof userId !== "string") {
        return res
            .status(400)
            .json({ error: "userId is required and must be a string" });
    }

    if (typeof score !== "number" || Number.isNaN(score)) {
        return res
            .status(400)
            .json({ error: "score is required and must be a number" });
    }

    next();
};

exports.validateViewRequest = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "id parameter is required" });
    }

    next();
};
