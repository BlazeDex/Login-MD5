const {Router} = require('express');
const router = Router();

const {renderIndex, renderAbout, renderInformation, renderSignInSelector, renderSignUpSelector} = require('../controllers/index.controller');

router.get('/', renderIndex);

router.get('/about', renderAbout);

router.get('/information', renderInformation);

router.get('/signin-selector', renderSignInSelector);

router.get('/signup-selector', renderSignUpSelector);


module.exports = router;
