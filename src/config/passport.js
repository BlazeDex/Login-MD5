const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const Professor = require('../models/Professor');

// Estrategia de autenticación para usuarios
passport.use('user-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Not user found.' });
    } else{
       const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        } 
    }    
}));

// Estrategia de autenticación para profesores
passport.use('professor-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const professor = await Professor.findOne({ email });
    if (!professor) {
        return done(null, false, { message: 'Not professor found.' });
    } else {
        const match = await professor.matchPassword(password);
        if (match) {
            return done(null, professor);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    }    
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            if (user) {
                done(null, user);
            } else {
                Professor.findById(id)
                    .then(professor => {
                        done(null, professor);
                    })
                    .catch(err => done(err));
            }
        })
        .catch(err => done(err));
});