const { Router } = require('express');
const router = Router();

const {
    renderSingUpForm,
    renderSingInForm,
    signup,
    signin,
    logout
}= require('../controllers/users.controller')

const {isLoggedIn} = require('../helpers/auth')

router.get('/users/signup', isLoggedIn, renderSingUpForm);
router.post('/users/signup', isLoggedIn, signup);

router.get('/users/signin', isLoggedIn, renderSingInForm);
router.post('/users/signin', isLoggedIn, signin);

router.get('/users/logout', logout);

module.exports = router;