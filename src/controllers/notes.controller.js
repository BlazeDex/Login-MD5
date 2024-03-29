const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
  const {title, description} = req.body;
  const newNote = new Note({title, description});
  newNote.user = req.user.id;
  await newNote.save();
  req.flash('success_msg', '¡Nota añadida correctamente!');
  res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({user: req.user.id}).lean();
  res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash('error_msg', '¡No estás autorizado!');
    return res.redirect('/notes');
  }
  res.render('notes/edit-note', {note});
};

notesCtrl.updateNotes = async (req, res) => {
  const {title, description} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', '¡Se ha actualizado la nota correctamente!');
  res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', '¡La nota se ha eliminado correctamente!');
  res.redirect('/notes');
};

notesCtrl.searchNotes = async (req, res) => {
  const {search} = req.body;
  const query = {user: req.user.id, title: {$regex: search, $options: 'i'}};
  const notes = await Note.find(query).lean();
  res.render('notes/all-notes', {notes});
};

module.exports = notesCtrl;
