const express = require("express");

const router = express.Router();

const {
  createShortLink,
  getLinkStats,
} = require("../controllers/link.controller");

router.post("/", createShortLink);

router.get("/:shortCode", getLinkStats);

module.exports = router;