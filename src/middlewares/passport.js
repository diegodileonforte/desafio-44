require('dotenv').config()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../config/index.js')

const FACEBOOK_CLIENT_ID = config.FACEBOOK_CLIENT_ID
const FACEBOOK_CLIENT_SECRET = config.FACEBOOK_CLIENT_SECRET

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
});

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/user/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, async function (accessToken, refreshToken, userProfile, done) {
  return done(null, userProfile)
}))

/* passport.use('register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async function (req, username, password, done) {
  try {
    const { username, password } = req.body
    const userInDb = await UserDAO.findOne({ username: username })
    if (userInDb) {
      return done(null, false, req.flash('error', 'Usuario ya registrado'))
    } else {
      const newUser = new UserDAO({ username, password })
      newUser.password = await newUser.encryptPassword(password)
      await newUser.save();
      return done(null, newUser, req.flash('success','Usuario registrado con éxito'))
    }
  }
  catch (error) {
    console.log(error)
  }
}))
passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const { username, password } = req.body
    const userRegistered = await UserDAO.findOne({ username: username })
    if (!userRegistered) {
      return done(null, false, req.flash('error', 'Usuario y/o Password inválido'))
    } else {
      const matchPassword = await userRegistered.checkPassword(password)
      if (matchPassword) {
        return done(null, userRegistered, req.flash('welcome', `${username}`))
      } else {
        return done(null, false, req.flash('error', 'Usuario y/o Password inválido'))
      }
    }
  } catch (error) {
    console.log(error)
  }
})); */

module.exports = passport