const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const UserRoute = require("./routes/user.routes");
const TransactionRoute = require("./routes/transaction.routes");
const DeviceRoute = require("./routes/device.routes");
const SubscriptionRoute = require("./routes/subscripton.routes.js");
const CardRoute = require("./routes/card.routes.js");
const EmailRoute = require("./routes/email.routes.js");

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.use("/",UserRoute);
app.use("/",TransactionRoute);
app.use("/",DeviceRoute);
app.use("/",SubscriptionRoute);
app.use("/",CardRoute);
app.use("/", EmailRoute);


module.exports = app;