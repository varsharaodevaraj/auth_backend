const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true,'Please enter an email'],
        minlength: [6,'Minimum password length is 6 characters']
    },
},{timestamps:true});

// fire a function after new user(doc) saved to db
// firs argument is the event that occurs and the 2nd is the func:
// if next chappkpothe server hang aythadi
// userSchema.post('save',function (doc,next){
//     console.log('new user created',doc);
//     next();
// })

// fire a function before a document saved
// userSchema.pre('save',function (next){
//     console.log('user about to be created',this);
//     next();
// })

userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

const User = mongoose.model('user',userSchema);

module.exports = User;