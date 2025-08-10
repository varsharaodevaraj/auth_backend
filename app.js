const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/user');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

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