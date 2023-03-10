const userCtrl = {};
const passport = require('passport');
const User = require('../models/User');

userCtrl.renderSingUpForm = (req, res) => {
    res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password) {
        errors.push({text: `Passwords don't match.`});
    }
    if(password.length < 6) {
        errors.push({text: 'Passwords must be at least 6 characters.'})
    }
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
      const emailUser = await User.findOne({email: email});
      if(emailUser) {
        req.flash('error_msg', 'The E-mail is already in use.');
        res.redirect('/users/signup');
      } else {
        const newUser = new User({name, email, password});
        await newUser.save();
        req.flash('success_msg', `You're registered`);
        res.redirect('/users/signin');
      }
    }
};

userCtrl.renderSingInForm = (req, res) => {
    res.render('users/signin');
};

userCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

userCtrl.logout = (req, res) => {
    res.send('logout');
};

module.exports = userCtrl;