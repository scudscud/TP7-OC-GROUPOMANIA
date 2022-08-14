// errors signup \\

exports.signUpErrors = (err) => {
  let errors = { lastname: "", firstname: "", badge: "",email: "", password: "", };
  if (err.message.includes("lastname")) errors.lastname = "veuillez vérifié vos données ,si le probleme persiste contactez un administrateur groupomania ";

  if (err.message.includes("firstname"))
  errors.firstname= "veuillez vérifié vos données ,si le probleme persiste contactez un administrateur groupomania ";

  if (err.message.includes("email")) errors.email = "veuillez vérifié vos données ,si le probleme persiste contactez un administrateur groupomania ";

  if (err.message.includes("badge")) errors.badge =
  "veuillez vérifié vos données ,si le probleme persiste contactez un administrateur groupomania ";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractéres au minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("bagde"))
    errors.badge = "veuillez vérifié vos données ,si le probleme persiste contactez un administrateur groupomania ";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "veuillez vérifié vos données ,si le probleme persiste contactez un administrateur groupomania ";

  return errors;
};


// errors signin \\


exports.signInErrors = (err) => { 
let errors =   "accée refusé, vérifié votre mail , n de badge et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania ";
  // let errors = { email: "", password: "" , badge:""};

  // if (err.message.includes("email"))
  //   errors.email =
  //     "accée refusé, Veuillez vérifié votre mail et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania ";

  // if (err.message.includes("badge"))
  //   errors.badge =
  //     "accée refusé, Veuillez vérifié votre mail et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania ";

  // if (err.message.includes("password"))
  //   errors.password =
  //     "accée refusé, Veuillez vérifié votre mail et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania ";

  return errors;
};

// errors multer \\

exports.multerErrors = (err) => {
  let errors = { maxsize: "", format: "" };

  if (err.message.includes("large")) errors.maxsize = "l'image est trop grande";

  if (err.message.includes("format"))
    errors.format = "il n'y a que les formats .png, .jpg and .jpeg autorisé";

  return errors;
};
