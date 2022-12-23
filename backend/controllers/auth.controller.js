const UserModel = require("../models/user.model");
const EmployeesModel = require("../models/employee.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const { log } = require("console");

// valid token jwt duration \\

const durationTokenLogin24 = 1 * 24 * 60 * 60 * 1000;
const durationTokenLogin12 = 1 * 12 * 60 * 60 * 1000;
const durationTokenLogout = 1;

// create token end point \\

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "12h", // securité sur la durée du token (journée de travail) //
  });
};

// signup end point \\

exports.signUp = async (req, res, next) => {
  
  const { lastname, firstname, email, badge, password } = req.body;
  const find = await EmployeesModel.find({
    lastname: lastname,
    firstname: firstname,
    email: email,
    badge: badge,
  }).count();
console.log(find);
  if (find != 1) {
    return res.status(401).json({ error: "echec veuillez réessayer, si le probleme persiste contacter un administrateur",
});
  }else{


 try {
  const userNew =  new UserModel({lastname: lastname,firstname: firstname,email: email,badge: badge,password: password })
  console.log( userNew);
 
  await userNew.save();

  return res.status(201).json(userNew);
} catch (err) {
console.log(err);

      const errors = signUpErrors(err);
  //  return res.status(400).send(errors);

}}
  // .then(()=>{
  //   // console.log(docs);
  //   return res.status(201).json(test);
  //   // next()
  // }).catch((err) => {
  //   const errors = signUpErrors(err);
  //   res.status(400).send(errors);
  // })
};


// signin end point cookie jwt \\

exports.signIn = async (req, res) => {
  const { email, badge, password } = req.body;
  try {
    const user = await UserModel.login(email, badge, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      // SameSite : None,
      session: false,
      maxAge: durationTokenLogin12,
      secure:false,
      httpOnly: true,
    });
    res.status(200).json({ user: user._id , token});
  } catch (err) {
    const errors = signInErrors(err);
    res.status(401).send({ errors });
  }
};







// logout end point \\

exports.logout = (req, res) => {
// console.log(req.cookies)
// console.log(res.cookie)

  res.cookie("jwt",'', { maxAge: durationTokenLogout })
  
  res.redirect("./");
};




// signin end point header jwt \\

// exports.signIn = async (req, res) => {
//   const { email, badge, password } = req.body;
//   try {
//     const user = await UserModel.login(email, badge, password);
//     const token = createToken(user._id);
//     res.status(200).json({ user: user._id, token});
//   } catch (err) {
//     const errors = signInErrors(err);
//     res.status(401).json({ errors });
//   }
// };





//----------------------------------------end---------------------------------------------------------------------------------------\\

//========================================================Code test or futur features=======================================================\\

//_______________find and update ok ------------------------------\\\\\\\\\\\

// exports.signUp = async (req, res, next) => {
//   const { name, firstname, email, badge,password} = req.body
// const  find = await UserModel.find({name:name, firstname:firstname,email:email,badge:badge}).count()
//      console.log( find)
//       if (!find || find > 2) {
//         return res.status(401).json({ error: "signUp problem" })}
//          try{
//        await UserModel.findOneAndUpdate(
//            { email: email} ,
//         { password: password},
//         { new: true, upsert: true, setDefaultsOnInsert: true}
//         )
//         .then((docs)=>res.send(docs))
//         res.status(201).json({ message: "Vous vous etes enregistre " });
//       }
//     catch (err) {
//     const errors = signUpErrors(err)

//     res.status(400).json({ errors })
//   }
// };




// exports.signUp = async (req, res, next) => {
//   const { name,firstname, badge, email, password } = req.body;
//   try {

//     const user = new UserModel({ ...req.body, name:name ,firstname :firstname, badge: badge, email:email, password:password});
//     res.status(201).json({ user: user._id });
//   } catch (err) {
//     const errors = signUpErrors(err);

//     res.status(400).json({ errors });
//   }
// };