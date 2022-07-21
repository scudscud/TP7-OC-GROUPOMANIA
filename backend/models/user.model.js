const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt")

// schema model database mongoose\\

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 22,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    minLenght: 3,
    maxLenght: 22,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 1024,
    unique: true,
    trim: true,
  },
  photo:{
type: String,
default:"./upload/profil/random-user.png"
  },
  bio:{
    type: String,
    max: 1024,
  },
  followers: {
    type: [String]
  },
  following:{
  type:[String]
  },
  following:{
    type:[String]
    },
},
{
 timestamps : true
}
);
//bcrypt password user \\

userSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password, salt );
next();
});



const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel; 