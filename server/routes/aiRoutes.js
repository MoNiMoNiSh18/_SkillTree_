const express = require("express");
const router = express.Router();
const multer = require("multer");
const aiController = require("../controllers/aiController");

const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");
router.post(
  "/resume",
  authMiddleware,
  upload.single("resume"),
  aiController.uploadResume
);

router.post(
  "/chat",
  authMiddleware,
  aiController.chatbot
);

module.exports = router;