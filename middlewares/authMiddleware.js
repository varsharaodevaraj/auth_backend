const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,'Varshadevrj@123secret',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,'Varshadevrj@123secret',async (err,decodedToken)=>{
            if(err){
                console.log(err);
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.
                next();
            }
        })
    }
}

module.exports = {
    requireAuth
}