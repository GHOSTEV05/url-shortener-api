const express = require("express");

const routes = require("./routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API is running.",
  });
});

const {
  redirectToOriginalUrl,
} = require("./controllers/link.controller");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);

app.get("/:shortCode", redirectToOriginalUrl);

app.use(notFound);
app.use(errorHandler);

module.exports = app;