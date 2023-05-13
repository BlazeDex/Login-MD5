const { Router } = require('express');
const router = Router();

const {
    renderSingUpForm,
    renderSingInForm,
    signup,
    signin,
    logout
}= require('../controllers/professors.controller')

const {isLoggedIn} = require('../helpers/auth')

router.get('/professors/signup', isLoggedIn, renderSingUpForm);
router.post('/professors/signup', isLoggedIn, signup);

router.get('/professors/signin', isLoggedIn, renderSingInForm);
router.post('/professors/signin', isLoggedIn, signin);

router.get('/professors/logout', logout);

module.exports = router;