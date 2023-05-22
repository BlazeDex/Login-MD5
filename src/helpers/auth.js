const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin-selector');
};

helpers.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  return next();
};

helpers.onlyProfessor = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isProfessor) {
    return next();
  } else {
    req.flash('error_msg', 'No estás autorizado para acceder a esta ruta.');
    res.redirect('/');
  };
};

helpers.onlyWorkers = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isProfessor || req.isAuthenticated() && req.user.isAdmin) {
    return next();
  } else {
    req.flash('error_msg', 'No estás autorizado para acceder a esta ruta.');
    res.redirect('/');
  };
};

helpers.onlyAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  } else {
    req.flash('error_msg', 'No estás autorizado para acceder a esta ruta.');
    res.redirect('/');
  };
};

module.exports = helpers;
