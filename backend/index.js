const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session")
const cookieParser = require("cookie-parser");
const ObjectID = require("mongoose").Types.ObjectId;
const cors = require("cors");
const fs = require("fs");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
require("./config/db");
require("dotenv").config({ path: ".env" });



const path = require("path")
// const multer = require('multer');

const app = express();

const dir = "images";
if (!fs.existsSync(dir)) {fs.mkdirSync(dir)}
const dirpicture = "images/default";
if (!fs.existsSync(dirpicture)) {fs.mkdirSync(dirpicture)}

// Cors parametre \\ 

const corsOptions = {
  Origin: '*' ,
  origin: process.env.CLIENT_URL,
  credentials: true,
  // allowedHeaders: ["set-cookie", "Content-type"],
  allowedHeaders: ["*", "Content-type"],
  exposeHeaders: ["*"],
  // exposeHeaders:["set-cookie"] ,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// parser \\
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//jwt check user id \\
app.get('*', checkUser
// ,(req,res)=>{ console.log(res.locals.user._id);res.send(res.locals.user._id)}
); // TODO 
app.get('/jwtid', requireAuth, (req,res)=>{
  console.log(req);
  if(req.user === ''){
    res.status(201).json(res.data = 'notoken')
  }else{
  res.status(200).send(res.locals.user._id)
}
});



// routes\\
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// static image express \\
app.use('/images', express.static(path.join(__dirname, 'images')))

// config serveur \\
app.listen(process.env.PORT, (port) =>
  console.log(`listening on port ${process.env.PORT}`)
);

