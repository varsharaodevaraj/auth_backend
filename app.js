const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/node-auth';
mongoose.connect(dbURI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);

app.listen(3000,()=>{
    console.log("Server listening")
});



// practice:
// // cookies
// app.get('/set-cookie',(req,res)=>{
//     // res.setHeader('Set-Cookie','newUser=true');

//     res.cookie('newUser',true);
//     res.cookie('isEmployed',false,{maxAge: 1000*60*60*24,secure: true});
//     res.cookie('isSingle',true,{maxAge: 1000*60*60*24,httpOnly: true});
//     res.send('you got the cookies!');
// });

// app.get('/get-cookie',(req,res)=>{
//     const cookies = req.cookies;
//     console.log(cookies);
//     console.log(cookies.newUser);
//     console.log(cookies.isEmployed);
//     res.json(cookies);
// });