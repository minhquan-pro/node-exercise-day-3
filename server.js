require("dotenv").config();
const express = require("express");

const appRoute = require("./src/routes");
const responseFormat = require("./src/middlewares/responseFormat");
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const exceptionHandler = require("./src/middlewares/exceptionHandler");
const createRateLimiter = require("./src/middlewares/rateLimiter");

const app = express();
const port = 3000;

app.use(express.json());
app.use(responseFormat);

app.use("/api", appRoute);
app.use(createRateLimiter.apiRateLimiter);
app.use(notFoundHandler);
app.use(exceptionHandler);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
