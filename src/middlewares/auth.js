module.exports =  function validate(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/user/login')
  }
}