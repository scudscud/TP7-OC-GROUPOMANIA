exports.signUpErrors = (err) =>{
    let errors = {pseudo: '', email:'', password:''}
    if(err.message.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect";

    if (err.message.includes('email'))
errors.email = "Email incorrect";

    if (err.message.includes('password'))
errors.password = 'Le mot de passe doit faire 6 caractéres au minimum';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = 'Pseudo incorrect, réessayer';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = 'Email invalide, réessayer';


    return errors;
}

exports.signInErrors = (err) => {
  
    let errors = { email :'', password: ''};
    
    if (err.message.includes('email'))  errors.email = "accée refusé, Veuillez vérifié votre mail et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania "; 


    if (err.message.includes('password')) errors.password = "accée refusé, Veuillez vérifié votre mail et / ou mot de passe, si le probleme persiste contactez un administrateur groupomania "; 

    return errors;
}

exports.uploadErrors = (err) => {
 let errors = {format: "" , maxSize: ""};

 if ( err.message.includes('trop grande'));
 errors.maxSize = ` l'image est trop grande`;

 if ( err.message.includes('invalid'));
 errors.format = "Format incompatible"

 return errors
}