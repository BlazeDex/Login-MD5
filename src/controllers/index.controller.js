const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderSignInSelector = (req, res) => {
  res.render('signin-selector');
};

indexCtrl.renderSignUpSelector = (req, res) => {
  res.render('signup-selector');
};

module.exports = indexCtrl;
