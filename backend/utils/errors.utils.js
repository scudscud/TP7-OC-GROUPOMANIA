// errors signup \\

exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.message.includes("pseudo")) errors.pseudo = "Pseudo incorrect";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractéres au minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Pseudo incorrect, réessayer";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email invalide, réessayer";

  return errors;
};


// errors signin \\


exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email"))
    errors.email =
      "accée refusé, Veuillez vérifié votre mail et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania ";

  if (err.message.includes("password"))
    errors.password =
      "accée refusé, Veuillez vérifié votre mail et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania ";

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
