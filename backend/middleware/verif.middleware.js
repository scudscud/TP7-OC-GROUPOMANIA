// ---- exemple d'un middleware Verify -------\\

exports.verifyUser = (req, res, next) => {
  const user = req.user;
  const postuser = req.body.posterId;
  const deluser = req.body.id;
  console.log(req.body.posterId);
  console.log(req.user);
  console.log(req.role);
  if (user === postuser || req.role === "admin" || user === deluser) {
    next();
  } else {
    res.status(404).json("erreur d 'utilisateur");
  }
};
