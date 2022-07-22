module.exports.signUpErrors = (err) =>{
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
