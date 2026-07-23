const express = require("express");

const router = express.Router();

const {
  createShortLink,
  getLinkStats,
  getLinks,
} = require("../controllers/link.controller");

router.post("/", createShortLink);

router.get("/", getLinks);

router.get("/:shortCode", getLinkStats);

module.exports = router;