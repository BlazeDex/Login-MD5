const facultiesCtrl = {};

const Faculty = require('../models/Faculty');

facultiesCtrl.renderFacultyForm = (req, res) => {
  res.render('faculties/new-faculty');
};

facultiesCtrl.createNewFaculty = async (req, res) => {
  const {name, description, duration} = req.body;
  const newFaculty = new Faculty({name, description, duration});
  await newFaculty.save();
  req.flash('success_msg', '¡Facultad añadida correctamente!');
  res.redirect('/faculties');
};

facultiesCtrl.renderFaculties = async (req, res) => {
  const faculties = await Faculty.find().lean();
  res.render('faculties/all-faculties', {faculties});
};

facultiesCtrl.viewFaculties = async (req, res) => {
  const faculties = await Faculty.find().lean();
  res.render('faculties/view-faculties', {faculties});
};

facultiesCtrl.renderEditForm = async (req, res) => {
  const faculty = await Faculty.findById(req.params.id).lean();
  res.render('faculties/edit-faculty', {faculty});
};

facultiesCtrl.updateFaculties = async (req, res) => {
  const {name, description, duration} = req.body;
  await Faculty.findByIdAndUpdate(req.params.id, {name, description, duration});
  req.flash('success_msg', '¡Los datos de la facultad se han actualizado!');
  res.redirect('/faculties');
};

facultiesCtrl.deleteFaculty = async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  req.flash('success_msg', '¡Se ha eliminado la facultad!');
  res.redirect('/faculties');
};

facultiesCtrl.searchFaculties = async (req, res) => {
  const {search} = req.body;
  const query = {name: {$regex: search, $options: 'i'}};
  const faculties = await Faculty.find(query).lean();
  res.render('faculties/all-faculties', {faculties});
};

facultiesCtrl.searcherFaculties = async (req, res) => {
  const {search} = req.body;
  const query = {name: {$regex: search, $options: 'i'}};
  const faculties = await Faculty.find(query).lean();
  res.render('faculties/view-faculties', {faculties});
};

module.exports = facultiesCtrl;
