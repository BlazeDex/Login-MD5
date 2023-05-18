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

const {isAuthenticated, justAdmin} = require('../helpers/auth');

// Nueva nota.
router.get('/faculties/add', isAuthenticated, justAdmin, renderFacultyForm);

router.post('/faculties/new-faculty', isAuthenticated, justAdmin, createNewFaculty);

// Obtener todas las notas.
router.get('/faculties', isAuthenticated, justAdmin, renderFaculties);

// Obtener notas buscadas.
router.post('/faculties/search', isAuthenticated, justAdmin, searchFaculties);

// Editar notas.
router.get('/faculties/edit/:id', isAuthenticated, justAdmin, renderEditForm);

router.put('/faculties/edit/:id', isAuthenticated, justAdmin, updateFaculties);

// Eliminar notas.
router.delete('/faculties/delete/:id', isAuthenticated, justAdmin, deleteFaculty);

module.exports = router;
