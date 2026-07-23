const express = require("express");

const router = express.Router();

const {
  createShortLink,
} = require("../controllers/link.controller");

router.post("/", createShortLink);

module.exports = router;