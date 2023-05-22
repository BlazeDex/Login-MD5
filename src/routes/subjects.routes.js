const {Router} = require('express');
const router = Router();

const {
  renderSubjectForm,
  createNewSubject,
  renderSubjects,
  renderEditForm,
  updateSubjects,
  deleteSubject,
  searchSubjects,
} = require('../controllers/subjects.controller');

const {isAuthenticated, onlyAdmin} = require('../helpers/auth');

// Nueva nota.
router.get('/subjects/add', isAuthenticated, onlyAdmin, renderSubjectForm);

router.post('/subjects/new-subject', isAuthenticated, onlyAdmin, createNewSubject);

// Obtener todas las notas.
router.get('/subjects', isAuthenticated, onlyAdmin, renderSubjects);

// Obtener notas buscadas.
router.post('/subjects/search', isAuthenticated, onlyAdmin, searchSubjects);

// Editar notas.
router.get('/subjects/edit/:id', isAuthenticated, onlyAdmin, renderEditForm);

router.put('/subjects/edit/:id', isAuthenticated, onlyAdmin, updateSubjects);

// Eliminar notas.
router.delete('/subjects/delete/:id', isAuthenticated, onlyAdmin, deleteSubject);

module.exports = router;
