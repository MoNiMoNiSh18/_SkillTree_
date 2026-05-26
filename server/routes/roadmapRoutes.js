const express = require("express");

const router = express.Router();

const roadmapController = require("../controllers/roadmapController");

router.post("/:student_id", roadmapController.getSkillGap);

module.exports = router;