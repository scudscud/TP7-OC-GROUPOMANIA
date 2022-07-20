const mongoose = require("mongoose");
const { renderSync } = require("node-sass");
// const { email } = require("validator");

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
    minLenght: 3,
    maxLenght: 22,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 22,
    unique: true,
    trim: true,
  },
});
const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;