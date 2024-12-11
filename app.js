const express = require("express");
const router = require("./routes");
const helmet = require("helmet");
const globalErrorHandler = require("./errors/globalErrorHandler");
const notFoundHandler = require("./errors/notFoundHandler");

const app = express();

app.use(helmet());
app.use(express.json());
app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFoundHandler);

module.exports = app;
