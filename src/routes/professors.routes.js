const {Router} = require('express');
const router = Router();

const {
  renderSingUpForm,
  renderSingInForm,
  signup,
  signin,
  renderProfessors,
  searchProfessors,
  deleteProfessor,
  logout,
}= require('../controllers/professors.controller');

const {isLoggedIn, isAuthenticated, onlyAdmin} = require('../helpers/auth');

router.get('/professors/signup', isLoggedIn, renderSingUpForm);
router.post('/professors/signup', isLoggedIn, signup);

router.get('/professors/signin', isLoggedIn, renderSingInForm);
router.post('/professors/signin', isLoggedIn, signin);

router.get('/professors', isAuthenticated, onlyAdmin, renderProfessors);
router.post('/professors/search', isAuthenticated, onlyAdmin, searchProfessors);
router.delete('/professors/delete/:id', isAuthenticated, onlyAdmin, deleteProfessor);

router.get('/professors/logout', logout);

module.exports = router;
