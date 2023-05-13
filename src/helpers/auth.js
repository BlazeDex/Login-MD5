const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin-selector');
};

helpers.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        res.redirect('/');
    }
    return next();
};

helpers.justProfessor = (req, res, next) => {
    if(req.isAuthenticated() && req.user.isProfessor) {
        return next();
    } else {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/');
        
    };
};

helpers.justAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.isAdmin) {
        return next();
    } else {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/');
        
    };
};

module.exports = helpers;