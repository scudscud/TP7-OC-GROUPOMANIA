const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.rpkx0p7.mongodb.net/groupomania",
    // "mongodb+srv://groupomania-admin:adminadmin@cluster0.rpkx0p7.mongodb.net/groupomania",
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
