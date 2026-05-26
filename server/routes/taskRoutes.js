const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/:role", taskController.getTasks);

router.post("/complete", taskController.completeTask);

router.get("/progress/:student_id", taskController.getProgress);

module.exports = router;