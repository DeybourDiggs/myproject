const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User.js')

const {checkIsNotAuthenticated} = require('../config/auth');

//Login Page
router.get('/login', checkIsNotAuthenticated, (req, res) => res.render('login'));

//Register Page

router.get('/register', checkIsNotAuthenticated, (req, res) => res.render('register'));

// Register

router.post('/register', (req, res) => {
  const {userName,firstName, lastName, tel,  email, password, password2} = req.body;
  let errors = [];

  if(!userName ||!firstName || !lastName || !tel || !email || !password || !password2) {
    errors.push({msg: "You must register all fields"})
  }

  if(password != password2) {
    errors.push({
      msg: "Password do not match"
    });
  }

  if(password.length < 8) {
    errors.push({
      msg: "Password must be at least 8 characters"
    });
  }

  if(errors.length > 0) {
    res.render('register', {
      errors,
      userName,
      firstName,
      lastName,
      tel,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email : email}).then(user => {
      if(user){
        errors.push({msg: "Email already exists"});
        res.render('register', {
          errors,
          userName, 
          firstName,
          lastName,
          tel,
          email,
          password,
          password2
        })
      }else {
        const newUser = new User({
          userName,
          firstName,
          lastName,
          tel, 
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
              req.flash(
                "success_msg", "Registration Successful, You can now proceed to Log in"
              );
              res.redirect('/users/login')
            })
            .catch(err => console.log(err))
          })
        })
      }
    })
  }
})


// LOGIN



router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if(err) {return next(err)}
    res.redirect('/users/login');
    req.flash("success_msg", "You are logged out")
  });


});

module.exports = router