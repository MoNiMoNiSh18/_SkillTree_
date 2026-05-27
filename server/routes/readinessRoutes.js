const express = require("express");

const router = express.Router();

const readinessController = require(
  "../controllers/readinessController"
);

router.get(
  "/:student_id",
  readinessController.getReadinessScore
);

module.exports = router;