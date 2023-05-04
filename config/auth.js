module.exports = {
  checkIsAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next()
    }
    req.flash("error_msg", "You have to be logged in to access this page");
    res.redirect('/users/login')
  },
  checkIsNotAuthenticated: function(req, res, next) {
    if(!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/welcome_page')
  }
}