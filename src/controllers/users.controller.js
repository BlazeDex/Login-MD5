const userCtrl = {};
const passport = require('passport');
const User = require('../models/User');

userCtrl.renderSingUpForm = (req, res) => {
  res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
  const errors = [];
  const {name, lastName, email, password, confirm_password} = req.body;
  if (password != confirm_password) {
    errors.push({text: `Las contraseñas no coinciden.`});
  }
  if (password.length < 6) {
    errors.push({text: 'La contraseña no debe contener menos de 6 caracteres.'});
  }
  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      lastName,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      req.flash('error_msg', 'El correo electrónico que ingresaste ya está en uso.');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({name, lastName, email, password});
      await newUser.save();
      req.flash('success_msg', `Ingresa las credenciales de tu cuenta.`);
      res.redirect('/users/signin');
    }
  }
};

userCtrl.renderSingInForm = (req, res) => {
  res.render('users/signin');
};

userCtrl.signin = passport.authenticate('user-local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true,
});

userCtrl.renderUsers = async (req, res) => {
  const users = await User.find().lean();
  res.render('users/all-users', {users});
};

userCtrl.searchUsers = async (req, res) => {
  const { search } = req.body;
  const query = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } }
    ]
  };
  const users = await User.find(query).lean();
  res.render('users/all-users', { users });
};

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash('success_msg', '¡Se ha eliminado al alumno!');
  res.redirect('/users');
};

userCtrl.logout = (req, res) => {
  req.logout( (err) => {
    if (err) {
      return next(err);
    }
    req.flash( 'success_msg', 'Has cerrado sesión.' );
    res.redirect( '/users/signin' );
  });
};

module.exports = userCtrl;
