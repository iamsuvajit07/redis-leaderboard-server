const express = require("express");
const viewRoutes = require("./routes/view.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();
app.use(express.json());

app.use(viewRoutes);
app.use(leaderboardRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Redis Live Leaderboard API is running" });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
