const User = require('../models/user');
const jwt = require('jsonwebtoken');

// handling errors:
const handleErrors = (err) => {
    console.log(err.message,err.code);
    let error = {email: '',password: ''};

    // checking duplicates:
    if(err.code == 11000){
        error.email = "email already registered";
        return error;
    }

    // validation errors:
    if(err.message.includes('user validation failed')){
        Object.values(err.error).forEach(({properties}) => {
            error[properties.path] = properties.message;
        })
    }

    return error;
}

// token creation:
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id },'Varshadevrj@123secret',{
        expiresIn: maxAge
    });
}


async function handleUserSignUpGet(req,res) {
    res.render('signup');
}

async function handleUserSignUpPost(req,res) {
    const {email,password} = req.body;

    try{
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true,maxAge: maxAge*1000});
        res.status(201).json({user: user._id});
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

async function handleUserLogInGet(req,res) {
    res.render('login');
}

async function handleUserLogInPost(req,res) {
    res.send('user login');
}

module.exports = {
    handleUserLogInGet,
    handleUserLogInPost,
    handleUserSignUpGet,
    handleUserSignUpPost
}