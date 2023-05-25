const professorCtrl = {};
const passport = require('passport');
const Professor = require('../models/Professor');

professorCtrl.renderSingUpForm = (req, res) => {
  res.render('professors/p-signup');
};

professorCtrl.signup = async (req, res) => {
  const errors = [];
  const {name, lastName, email, password, confirm_password} = req.body;
  if (password != confirm_password) {
    errors.push({text: `Las contraseñas no coniciden.`});
  }
  if (password.length < 6) {
    errors.push({text: 'La contraseña debe contener al menos 6 caracteres.'});
  }
  if (errors.length > 0) {
    res.render('professors/p-signup', {
      errors,
      name,
      lastName,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailProfessor = await Professor.findOne({email: email});
    if (emailProfessor) {
      req.flash('error_msg', 'El correo electrónico que ingresaste ya está en uso.');
      res.redirect('/professors/signup');
    } else {
      const newProfessor = new Professor({name, lastName, email, password});
      await newProfessor.save();
      req.flash('success_msg', `Ingresa las credenciales de tu cuenta.`);
      res.redirect('/professors/signin');
    }
  }
};

professorCtrl.renderSingInForm = (req, res) => {
  res.render('professors/p-signin');
};

professorCtrl.signin = (req, res, next) => {
  passport.authenticate('professor-local', (err, user, info) => {
    if (err) {
      // Handle error
      return next(err);
    }

    if (!user) {
      // Authentication failed
      req.flash('error_msg', info.message);
      return res.redirect('/professors/signin');
    }

    req.logIn(user, (err) => {
      if (err) {
        // Handle error
        return next(err);
      }

      if (req.user.isAdmin) {
        return res.redirect('/faculties');
      } else {
        return res.redirect('/view-faculties');
      }
    });
  })(req, res, next);
};

professorCtrl.renderProfessors = async (req, res) => {
  const professors = await Professor.find({isAdmin: false}).lean();
  res.render('professors/all-professors', {professors});
};

professorCtrl.deleteProfessor = async (req, res) => {
  await Professor.findByIdAndDelete(req.params.id);
  req.flash('success_msg', '¡Se ha eliminado al profesor!');
  res.redirect('/professors');
};

professorCtrl.searchProfessors = async (req, res) => {
  const { search } = req.body;
  const query = {
    $and: [
      { isAdmin: false },
      {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } }
        ]
      }
    ]
  };
  const professors = await Professor.find(query).lean();
  res.render('professors/all-professors', { professors });
};

professorCtrl.logout = (req, res) => {
  req.logout( (err) => {
    if (err) {
      return next(err);
    }
    req.flash( 'success_msg', 'Has cerrado sesión.' );
    res.redirect( '/professors/signin' );
  });
};

module.exports = professorCtrl;
