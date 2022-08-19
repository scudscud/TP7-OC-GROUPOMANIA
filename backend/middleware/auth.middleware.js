const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const ObjectID = require("mongoose").Types.ObjectId;

const durationTokenLogout = 1

exports.requireAuth = (req,res,next)=>{

    const token = req.cookies.jwt;
   if (token){
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken)=>{
        if(err){
            console.log('no token');
            res.status(401).send('token not found');
        }else{
            req.user = decodedToken.id;
            console.log("mmid"+decodedToken.id);
            res.status(200).json(decodedToken.id)
        
       next()
        }
    })
   }else{
    console.log('access denied invalid token ');
    // res.status(401).json('erreur')
   }
};


exports.authUser = (req, res ,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.status(401).send('token not found');
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(401).send('invalid token')
        }
        console.log(req.body);
        req.user = user.id;
        next();
    });
    // next();
}

// =====================ROUTE checkuser======useless===================== \\\

exports.checkUser = ( req,res,next)=>{
    const auth = req.headers.cookie
    const token = auth && auth.split('=')[1]

    console.log(token);

// const token = req.params.jwt;
if(token){
  
    jwt.verify( token , process.env.TOKEN_SECRET, async ( err, decodedToken)=> {
   if (err){
   
    res.locals.user = null;
    res.cookie('jwt','', { session:false, maxAge: 1 });
    next();
    }else{
        console.log(decodedToken);
  let user = await UserModel.findById(decodedToken.id);
  console.log("test"+user)
   res.locals.user = user;
  next();
    }
    })
}else{ 
    res.locals.user = null;
    next();
}

};
