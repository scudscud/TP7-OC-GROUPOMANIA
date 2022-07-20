const bodyParser = require("body-parser");
const express = require("express");
const userRoutes = require("./routes/user.routes");
// require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();
// body parser config \\
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes\\
app.use("/api/user", userRoutes);
// config serveur \\
app.listen(process.env.PORT, (port) =>
  console.log(`listening on port ${(process.env.PORT)}`)
);
