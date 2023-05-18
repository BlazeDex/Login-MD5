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

const {isAuthenticated, justAdmin} = require('../helpers/auth');

// Nueva nota.
router.get('/subjects/add', isAuthenticated, justAdmin, renderSubjectForm);

router.post('/subjects/new-subject', isAuthenticated, justAdmin, createNewSubject);

// Obtener todas las notas.
router.get('/subjects', isAuthenticated, justAdmin, renderSubjects);

// Obtener notas buscadas.
router.post('/subjects/search', isAuthenticated, justAdmin, searchSubjects);

// Editar notas.
router.get('/subjects/edit/:id', isAuthenticated, justAdmin, renderEditForm);

router.put('/subjects/edit/:id', isAuthenticated, justAdmin, updateSubjects);

// Eliminar notas.
router.delete('/subjects/delete/:id', isAuthenticated, justAdmin, deleteSubject);

module.exports = router;
