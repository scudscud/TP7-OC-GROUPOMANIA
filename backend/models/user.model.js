const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt")

// schema model database mongoose\\

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 22,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    minlenth: 3,
    maxlength: 22,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
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

// crypt password from sign up \\
userSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password, salt );
next();
});

// decrypt to compare password login -- signup \\
userSchema.statics.login = async function (email,password){
const user = await this.findOne({email});
if (user){
  const auth = await bcrypt.compare(password, user.password);
  if (auth){
    return user;
  }
  throw Error ('test password accée refusé, Veuillez vérifié votre mail et/ou mot de passe, si le probleme persiste contactez un administrateur groupomania ');
}
throw Error ('test email accée refusé, Veuillez vérifié votre mail et/ou mot de passe, si le probleme persiste contactez un administrateur groupomania ')
}


const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel; 