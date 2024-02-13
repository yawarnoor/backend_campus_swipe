const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const UserRoute = require("./routes/user.routes");
const TransactionRoute = require("./routes/transaction.routes");
const DeviceRoute = require("./routes/device.routes");
const SubscriptionRoute = require("./routes/subscripton.routes.js");

const app = express();

app.use(cors());

app.use(bodyParser.json())

// Hi
app.use("/",UserRoute);
app.use("/",TransactionRoute);
app.use("/",DeviceRoute);
app.use("/",SubscriptionRoute);

module.exports = app;