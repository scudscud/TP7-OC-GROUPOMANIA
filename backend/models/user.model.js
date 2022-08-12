const mongoose = require("mongoose");
const { isEmail}= require("validator");
const { isBadge}  = require("validator");

const bcrypt = require("bcrypt");

// schema model database mongoose\\

const userSchema = mongoose.Schema(
  {

    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      minlenth: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      minlenth: 3,
      maxlength: 100,
      unique: true,
      trim: true,
    },
    badge: {
      type: String,
      required: true,
      // validate: [isBadge],
      minlenth: 3,
      maxlength: 22,
      unique: true,
      trim: true,
    },
   password: {
      type: String,
      required: true,
      minlenth: 3,
      maxlength: 50,
      trim: true,
    },
    // comfirmPassword: {
    //   type: String,
    //   minlength: 6,
    //   maxlength: 50,
    //   trim: true,
    // },
    photo: {
      type: String,
      default: "./upload/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    following: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
//bcrypt password and badge user \\

// crypt password and badge from sign up \\
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.badge = await bcrypt.hash(this.badge, salt);
  next();
});

// crypt badge from sign up \\
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.badge = await bcrypt.hash(this.badge, salt);
//   next();
// });

// decrypt to compare badge and password login -- signup \\
userSchema.statics.login = async function (email, badge, password) {
  // console.log(user);
  const user = await this.findOne({email})

  if (user) { 
  
    const auth = await bcrypt.compare(password, user.password)
    && (badge,user.badge)
    ;
    if (auth) {
      return user;
    }
    throw Error(
      "test password accée refusé  "
    );
  }
  throw Error(
    "test email accée refusé "
  );
};



const UserModel = mongoose.model("user", userSchema);


module.exports = UserModel ;
