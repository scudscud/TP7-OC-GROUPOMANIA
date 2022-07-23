const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const durationTokenLogout = 1

module.exports.checkUser = ( req,res,next)=>{
   
const token = req.cookies.jwt;
// console.log(token);
if(token){
    jwt.verify( token , process.env.TOKEN_SECRET, async ( err, decodedToken)=> {
   if (err){
    res.locals.user = null;
    res.cookie('jwt','', { session:false, maxAge: 1 });
    next();
    }else{
        console.log(decodedToken);
  let user = await UserModel.findById(decodedToken.id);

  console.log(res.locals.user);
  res.locals.user = user;
  next();
    }
    })
}else{ 
    res.locals.user = null;
    next()
}
}

module.exports.requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
   if (token){
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken)=>{
        if(err){
            console.log(err);
        }else{
            console.log(decodedToken.id);
            next()
        }
    })
   }else{
    console.log('access denied invalid token ');
    
   }
}