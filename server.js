const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Be able to receive body in POST requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Hook up to router.
const apiRouter = express.Router();
require("./app/routes/index")(apiRouter);
app.use("/api/v1", apiRouter);

// Use frontend.
app.use(express.static(__dirname + '/build/'));

// Run app.
app.listen(process.env.PORT || 8080);