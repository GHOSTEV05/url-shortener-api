const express = require("express");

const router = express.Router();

const {
  createShortLink,
  getLinkStats,
  getLinks,
  deleteShortLink,
} = require("../controllers/link.controller");

/**
 * @swagger
 * /api/v1/links:
 *   post:
 *     summary: Create a shortened URL
 *     tags:
 *       - Links
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://google.com
 *     responses:
 *       201:
 *         description: Short link created successfully
 *       400:
 *         description: Invalid URL
 */
router.post("/", createShortLink);

/**
 * @swagger
 * /api/v1/links:
 *   get:
 *     summary: Get all shortened links
 *     tags:
 *       - Links
 *     responses:
 *       200:
 *         description: List of shortened links
 */
router.get("/", getLinks);

/**
 * @swagger
 * /api/v1/links/{shortCode}:
 *   get:
 *     summary: Get link statistics
 *     tags:
 *       - Links
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Link statistics
 *       404:
 *         description: Short link not found
 */
router.get("/:shortCode", getLinkStats);

/**
 * @swagger
 * /api/v1/links/{shortCode}:
 *   delete:
 *     summary: Delete a shortened link
 *     tags:
 *       - Links
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Link deleted successfully
 *       404:
 *         description: Short link not found
 */
router.delete("/:shortCode", deleteShortLink);

module.exports = router;