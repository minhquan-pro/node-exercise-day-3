const express = require("express");
const router = express.Router();

const taskRoute = require("./task.route");

router.use("/tasks", taskRoute);

module.exports = router;
