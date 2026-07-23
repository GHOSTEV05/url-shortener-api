const express = require("express");

const router = express.Router();

const {
  createShortLink,
  getLinkStats,
  getLinks,
  deleteShortLink,
} = require("../controllers/link.controller");

router.post("/", createShortLink);

router.get("/", getLinks);

router.get("/:shortCode", getLinkStats);

router.delete("/:shortCode", deleteShortLink);

module.exports = router;