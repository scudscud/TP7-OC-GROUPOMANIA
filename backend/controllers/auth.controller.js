const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
// const { db } = require("../models/user.model");

// valid token jwt duration \\

const durationTokenLogin = 1 * 24 * 60 * 60 * 1000;

// create token end point \\

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// signup end point \\

// exports.signUp = async (req, res, next) => {
//   const { nom, prenom, email,badge , password } = req.body;
//   try {
//     if(req.body === req.params){
//     const user = await UserModel.create({  nom, prenom, email,badge , password});
//     res.status(201).json({ user: user._id })};
//   } catch (err) {
//     const errors = signUpErrors(err);

//     res.status(400).json({ errors });
//   }
// };
exports.signUp = async (req, res, next) => {
  const { name, firsName, email, badge, password } = req.body;
  
     db.employees.find({
      name :name, firsName :firsName, email: email, badge:badge, password: password  })
      .then((user)=>{
        if(!user || user > 2 ){
          return res.status(401).json({ error: "signUp problem" });
        }})
        .then((create)=>{
    const user = await UserModel.create({ name, firsName,  email,badge , password})
    res.status(201).json({ user: user._id , message: "Vous vous etes enregistre "})
  })
   .catch ((err) =>{
    const errors = signUpErrors(err)

    res.status(400).json({ errors })
  })
};

// signin end point \\

exports.signIn = async (req, res) => {
  const { email,badge ,password } = req.body;
  try {
    const user = await UserModel.login(email, badge, password);
    const token = createToken(user._id);
    // jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),})
    res.cookie("jwt", token, {
      session: false,
      maxAge: durationTokenLogin,
      httpOnly: true,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(401).json({ errors });
  }
};

// logout end point \\

exports.logout = (req, res) => {
  res.cookie("jwt", "", { session: false, maxAge: durationTokenLogin });
  res.redirect("./");
};
