const { Router } = require('express');
const router = Router();

const { renderIndex, renderAbout, renderSignInSelector, renderSignUpSelector } = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/about', renderAbout);

router.get('/signin-selector', renderSignInSelector);

router.get('/signup-selector', renderSignUpSelector);




module.exports = router;