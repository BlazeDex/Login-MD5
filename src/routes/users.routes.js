const {Router} = require('express');
const router = Router();

const {
  renderSingUpForm,
  renderSingInForm,
  signup,
  signin,
  renderUsers,
  searchUsers,
  deleteUser,
  logout,
}= require('../controllers/users.controller');

const {isLoggedIn, isAuthenticated, onlyAdmin} = require('../helpers/auth');

router.get('/users/signup', isLoggedIn, renderSingUpForm);
router.post('/users/signup', isLoggedIn, signup);

router.get('/users/signin', isLoggedIn, renderSingInForm);
router.post('/users/signin', isLoggedIn, signin);

router.get('/users', isAuthenticated, onlyAdmin, renderUsers);
router.post('/users/search', isAuthenticated, onlyAdmin, searchUsers);
router.delete('/users/delete/:id', isAuthenticated, onlyAdmin, deleteUser);

router.get('/users/logout', logout);

module.exports = router;
