const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("./config/db");
require("dotenv").config({ path: ".env" });
const { checkUser, requireAuth , authUser } = require("./middleware/auth.middleware");
const path = require("path")
// const multer = require('multer');


const app = express();

// Cors parametre \\

const corsOptions = {
  origin: process.env.CLIENT_URL,
  Credentials: true,
  allowedHeaders: ["sessionId", "Content-type"],
  // exposeHeaders: ["sessionId"],
  exposeHeaders:["*"] ,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// parser \\

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt check user id \\
// app.get("/*", checkUser,(req,res)=>{res.send(req.user)}); // TODO 
app.get("/jwtid", requireAuth, (req,res)=>{res.send(req.user)});
// app.get('/me',authUser,(req,res)=>{res.send(req.user)});

// routes\\
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// static image express \\
app.use('/images', express.static(path.join(__dirname, 'images')))

// config serveur \\
app.listen(process.env.PORT, (port) =>
  console.log(`listening on port ${process.env.PORT}`)
);

// ===============ROUTE checkuser===============================================================================\\

