const express = require("express");
const route = express.Router();

const taskController = require("../controllers/task.controller");

route.get("/", taskController.findAll);
route.get("/:id", taskController.findOne);

route.post("/", taskController.create);
route.patch("/:id", taskController.update);
route.delete("/:id", taskController.deleteTask);

module.exports = route;
