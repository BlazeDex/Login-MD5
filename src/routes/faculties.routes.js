const {Router} = require('express');
const router = Router();

const {
  renderFacultyForm,
  createNewFaculty,
  renderFaculties,
  viewFaculties,
  renderEditForm,
  updateFaculties,
  deleteFaculty,
  searchFaculties,
  searcherFaculties
} = require('../controllers/faculties.controller');

const {isAuthenticated, onlyWorkers, onlyAdmin} = require('../helpers/auth');

// Nueva facultad.
router.get('/faculties/add', isAuthenticated, onlyAdmin, renderFacultyForm);

router.post('/faculties/new-faculty', isAuthenticated, onlyAdmin, createNewFaculty);

// Obtener todas las facultades.
router.get('/faculties', isAuthenticated, onlyAdmin, renderFaculties);
router.get('/view-faculties', isAuthenticated, onlyWorkers, viewFaculties);

// Obtener facultades buscadas.
router.post('/faculties/search', isAuthenticated, onlyWorkers, searchFaculties);
router.post('/view-faculties/search', isAuthenticated, onlyWorkers, searcherFaculties);

// Editar facultades.
router.get('/faculties/edit/:id', isAuthenticated, onlyAdmin, renderEditForm);

router.put('/faculties/edit/:id', isAuthenticated, onlyAdmin, updateFaculties);

// Eliminar facultades.
router.delete('/faculties/delete/:id', isAuthenticated, onlyAdmin, deleteFaculty);

module.exports = router;
