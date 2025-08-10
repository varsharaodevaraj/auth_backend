const User = require('../models/user');

const handleErrors = (err) => {
    console.log(err.message,err.code);
    let error = {email: '',password: ''};

    // checking duplicates:
    if(err.code == 11000){
        errors.email = "email already registered";
        return errors;
    }

    // validation errors:
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return error;
}

async function handleUserSignUpGet(req,res) {
    res.render('signup');
}

async function handleUserSignUpPost(req,res) {
    const {email,password} = req.body;

    try{
        const user = await User.create({email,password});
        res.status(201).json(user);
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