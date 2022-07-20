// require("dotenv").config({ path:'./.env'});
const mongoose = require("mongoose");
console.log(require('dotenv').config({ path:'./.env'}))
mongoose
  .connect(

    "mongodb+srv://"+process.env.DB_USER_PASS+"@cluster0.rpkx0p7.mongodb.net/groupomania",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
