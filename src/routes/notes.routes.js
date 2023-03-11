const { Router } = require('express');
const router = Router();

const { 
    renderNoteForm, 
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNotes, 
    deleteNote
} = require('../controllers/notes.controller');

// Nueva nota.
router.get('/notes/add', renderNoteForm);

router.post('/notes/add', createNewNote);

// Obtener todas las notas.
router.get('/notes', renderNotes);

// Editar notas.
router.get('/notes/edit/:id', renderEditForm);

router.put('/notes/edit/:id', updateNotes);

// Eliminar notas.
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;