const { z } = require("zod");

const createLinkSchema = z.object({
  url: z.url("Please provide a valid URL"),
});

module.exports = {
  createLinkSchema,
};