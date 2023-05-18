const {Router} = require('express');
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNotes,
  deleteNote,
  searchNotes,
} = require('../controllers/notes.controller');

const {isAuthenticated, justProfessor} = require('../helpers/auth');

// Nueva nota.
router.get('/notes/add', isAuthenticated, justProfessor, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, justProfessor, createNewNote);

// Obtener todas las notas.
router.get('/notes', isAuthenticated, renderNotes);

// Obtener notas buscadas.
router.post('/notes/search', isAuthenticated, searchNotes);

// Editar notas.
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, updateNotes);

// Eliminar notas.
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;
