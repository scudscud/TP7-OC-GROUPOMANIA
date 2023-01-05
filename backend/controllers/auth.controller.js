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
    return res
      .status(401)
      .json({
        error:
          "echec veuillez réessayer, si le probleme persiste contacter un administrateur",
      });
  } else {
    try {
      const userNew = new UserModel({
        lastname: lastname,
        firstname: firstname,
        email: email,
        badge: badge,
        password: password,
      });
      console.log(userNew);

      await userNew.save();

      return res.status(201).json(userNew);
    } catch (err) {
      console.log(err);

      const errors = signUpErrors(err);
    }
  }
};


// signin end point cookie jwt \\

exports.signIn = async (req, res) => {
  const { email, badge, password } = req.body;
  try {
    const ban = UserModel.findById();
    const user = await UserModel.login(email, badge, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      // SameSite : None,
      session: false,
      maxAge: durationTokenLogin12,
      secure: false,
      httpOnly: true,
    });
    UserModel.findOne({ _id: user, ban: true }, (err, doc) => {
      if (doc) {
        res.cookie("jwt", "", { maxAge: durationTokenLogout }),
        res.status(400).json("utilisateur banni");
      } else {
        res.status(200).json({ user: user._id, token });
      }
    });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(401).send({ errors });
  }
};


// logout end point \\

exports.logout = (req, res) => {
  // console.log(req.cookies)
  // console.log(res.cookie)
  
  res.cookie("jwt", "", { maxAge: durationTokenLogout });
  
  res.redirect("./");
};

// ======================== login and signup without badge and employees model ============================\\

// exports.signUp = async (req, res, next) => {
//   const { lastname, firstname, email, password } = req.body;
//     try {
//       const userNew = new UserModel({
//         lastname: lastname,
//         firstname: firstname,
//         email: email,
//         password: password,
//       });
//       console.log(userNew);
//       await userNew.save();

//       return res.status(201).json(userNew);
//     } catch (err) {
//       console.log(err);
//       const errors = signUpErrors(err);
//     }
// };



// exports.signIn = async (req, res) => {
//   const { email,password } = req.body;
//   try {
//     const ban = UserModel.findById();
//     const user = await UserModel.login(email, password);
//     const token = createToken(user._id);
//     res.cookie("jwt", token, {
//       // SameSite : None,
//       session: false,
//       maxAge: durationTokenLogin12,
//       secure: false,
//       httpOnly: true,
//     });
//     UserModel.findOne({ _id: user, ban: true }, (err, doc) => {
//       if (doc) {
//         res.cookie("jwt", "", { maxAge: durationTokenLogout }),
//         res.status(400).json("utilisateur banni");
//       } else {
//         res.status(200).json({ user: user._id, token });
//       }
//     });
//   } catch (err) {
//     const errors = signInErrors(err);
//     res.status(401).send({ errors });
//   }
// };

//----------------------------------------end---------------------------------------------------------------------------------------\\

