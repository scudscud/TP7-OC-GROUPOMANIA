const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("./config/db");
require("dotenv").config({ path: "../.env" });
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  Credentials: true,
  allowedHeaders: ["sessionId", "Content-type"],
  exposeHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt check user id \\
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user);
});

// routes\\
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
// config serveur \\
app.listen(process.env.PORT, (port) =>
  console.log(`listening on port ${process.env.PORT}`)
);
// body parser config \\
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
