const dotenv = require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("passport");
const flash = require("connect-flash");
const indexRouter = require('./routes/index.js');
const userRouter = require("./routes/users.js") ;

const app = express();

const connectDB = require("./db-config/db")

const port =  6021;

connectDB()

require('./config/passport')(passport);


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session());

app.use(flash());


app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req .flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', indexRouter);
app.use('/users', userRouter);


app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});