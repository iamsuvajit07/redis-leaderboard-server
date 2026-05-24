const router = require("express").Router();
const {
    addScore,
    getTopLeaderboard,
    getUserRank,
} = require("../controllers/leaderboard.controller");
const { validateScoreRequest } = require("../middleware/validate.middleware");
const { asyncHandler } = require("../middleware/async.middleware");

router.post("/leaderboard/score", validateScoreRequest, asyncHandler(addScore));
router.get("/leaderboard", asyncHandler(getTopLeaderboard));
router.get("/leaderboard/:userid/rank", asyncHandler(getUserRank));

module.exports = router;
