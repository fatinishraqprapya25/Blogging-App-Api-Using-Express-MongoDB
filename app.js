const express = require("express");
const router = require("./routes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();
app.use(express.json());  // json perser
app.use("/api/v1", router) // router
app.use(globalErrorHandler) // global error handler
app.use(notFoundHandler) // not found handler

module.exports = app;
