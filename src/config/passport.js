const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordFiels: 'password'
}, async (email, password, done) => {

    //Confirmar que el correo existe.
    const user = await User.findOne({email})
    if(!user) {
        return done(null, false, { message: 'Not user found.'});  
    } else {
        //Validar contraseña de usuario.
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => done(err));
});