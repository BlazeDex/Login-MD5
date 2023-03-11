const notesCtrl = {};

notesCtrl.renderNoteForm = (req, res) => {
    res.send('note add');
};

notesCtrl.createNewNote = (req, res) => {
    res.send('new note');
}

notesCtrl.renderNotes = (req, res) => {
    res.send('render notes');
}

notesCtrl.renderEditForm = (req, res) => {
    res.send('render edit form');
}

notesCtrl.updateNotes = (req, res) => {
    res.send('Update note');
}

notesCtrl.deleteNote = (req, res) => {
    res.send('Eliminando nota');
}

module.exports = notesCtrl;