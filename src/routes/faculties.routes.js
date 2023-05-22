const {Router} = require('express');
const router = Router();

const {
  renderFacultyForm,
  createNewFaculty,
  renderFaculties,
  renderEditForm,
  updateFaculties,
  deleteFaculty,
  searchFaculties,
} = require('../controllers/faculties.controller');

const {isAuthenticated, onlyAdmin} = require('../helpers/auth');

// Nueva nota.
router.get('/faculties/add', isAuthenticated, onlyAdmin, renderFacultyForm);

router.post('/faculties/new-faculty', isAuthenticated, onlyAdmin, createNewFaculty);

// Obtener todas las notas.
router.get('/faculties', isAuthenticated, onlyAdmin, renderFaculties);

// Obtener notas buscadas.
router.post('/faculties/search', isAuthenticated, onlyAdmin, searchFaculties);

// Editar notas.
router.get('/faculties/edit/:id', isAuthenticated, onlyAdmin, renderEditForm);

router.put('/faculties/edit/:id', isAuthenticated, onlyAdmin, updateFaculties);

// Eliminar notas.
router.delete('/faculties/delete/:id', isAuthenticated, onlyAdmin, deleteFaculty);

module.exports = router;
