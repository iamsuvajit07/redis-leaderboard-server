const router = require("express").Router();
const { incrementView } = require("../controllers/view.controller");
const { validateViewRequest } = require("../middleware/validate.middleware");
const { asyncHandler } = require("../middleware/async.middleware");

router.post("/:id/view", validateViewRequest, asyncHandler(incrementView));

module.exports = router;
