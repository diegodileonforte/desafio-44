const express = require('express');
const User = require('../controllers/Users.js');
const passport = require('passport');
const validate = require('../middlewares/auth.js');

const usersRoutes = express.Router();
const user = new User();

usersRoutes.get('/auth/facebook', passport.authenticate('facebook'))
usersRoutes.get('/auth/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/user/main',
    failureRedirect: '/user/login'
}))

usersRoutes.get('/main', user.mainGet)
usersRoutes.get('/logout', user.logout)
usersRoutes.get('/login', user.loginGet)
usersRoutes.get('/register', user.registerGet)

module.exports =  usersRoutes