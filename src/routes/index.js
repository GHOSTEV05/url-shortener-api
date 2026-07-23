const express = require("express");

const router = express.Router();

const linkRoutes = require("./link.routes");

router.use("/links", linkRoutes);

module.exports = router;