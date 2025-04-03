const express = require("express");
const router = require("./routes");
const helmet = require("helmet");
const cors = require("cors");
const trackTraffic = require("./middlewares/trackTraffic");
const globalErrorHandler = require("./errors/globalErrorHandler");
const notFoundHandler = require("./errors/notFoundHandler");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trackTraffic);
app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFoundHandler);

module.exports = app;
