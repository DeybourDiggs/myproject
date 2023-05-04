const express = require('express');

const router = express.Router();

const User = require('../models/User.js')

const {checkIsAuthenticated, checkIsNotAuthenticated } = require("../config/auth");

//Welcome Home

router.get('/', checkIsNotAuthenticated, (req,res) => res.render('landing'));

// router.get('/dashboard', checkIsAuthenticated,(req, res) => 
// {
//   res.render('welcome_page', {name: req.user.email}
  
//   )})


router.get('/dashboard', checkIsAuthenticated, async (req, res) => {

    const locals = {
        title: "Dashboard"
    }
    const allUser = await User.find()
    console.log(allUser);

    const name = req.body.email
    console.log(name)
    res.render('welcome_page', {allUser, locals})
})

module.exports = router;