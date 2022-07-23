const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const express = require("express");
const userRoutes = require("./routes/user.routes");

require("./config/db");
require("dotenv").config({ path: "../.env" });
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



//jwt check user id \\
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=>{
  res.status(200).send(res.locals.user)
  
});

// routes\\
app.use("/api/user", userRoutes);
// config serveur \\
app.listen(process.env.PORT, (port) =>
  console.log(`listening on port ${(process.env.PORT)}`)
);
// body parser config \\
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
