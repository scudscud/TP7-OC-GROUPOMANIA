const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const durationTokenLogout = 1

exports.requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
   if (token){
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken)=>{
        if(err){
            return res.status(401).send('token not found');
        }else{
            req.user = decodedToken.id;
            next();
        }
    })
   }else{
    console.log('access denied invalid token ');
    res.status(400).json('token not found')
   }
};


exports.authUser = (req, res ,next) =>{
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if(!token) {
    //     return res.status(401).send('token not found');
    // }
    // jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    //     if(err) {
    //         return res.status(401).send('invalid token')
    //     }
    //     console.log(req.body);
    //     req.user = user.id;
        // next();
    // });
    next();
}

// =====================ROUTE checkuser======useless===================== \\\

exports.checkUser = ( req,res,next)=>{
// const token = req.params.jwt;
// if(token){
//     jwt.verify( token , process.env.TOKEN_SECRET, async ( err, decodedToken)=> {
//    if (err){
   
//     res.locals.user = null;
//     res.cookie('jwt','', { session:false, maxAge: 1 });
//     next();
//     }else{
//         console.log(decodedToken);
//   let user = await UserModel.findById(decodedToken.id);
//   console.log(user)
//   res.locals.user = user;
//   next();
//     }
//     })
// }else{ 
//     res.locals.user = null;
//     next();
// }
next()
};
