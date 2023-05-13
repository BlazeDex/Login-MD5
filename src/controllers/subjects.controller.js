const subjectsCtrl = {};

const Subject = require('../models/Subject');

subjectsCtrl.renderSubjectForm = (req, res) => {
    res.render('subjects/new-Subject');
};

subjectsCtrl.createNewSubject = async (req, res) => {
    const {name, description, hours} = req.body;
    const newSubject = new Subject({name , description, hours});
    await newSubject.save();
    req.flash('success_msg', 'Subject added succesfully');
    res.redirect('/subjects');
};

subjectsCtrl.renderSubjects = async (req, res) => {
    const subjects = await Subject.find().lean();
    res.render('subjects/all-subjects', { subjects });
}

subjectsCtrl.renderEditForm = async (req, res) => {
   const subject = await Subject.findById(req.params.id).lean();   
   res.render('subjects/edit-subject', { subject });
}

subjectsCtrl.updateSubjects = async (req, res) => {
    const {name, description, hours} = req.body;
    await Subject.findByIdAndUpdate(req.params.id, {name, description, hours});
    req.flash('success_msg', 'Subject updated successfully');
    res.redirect('/subjects');
}

subjectsCtrl.deleteSubject = async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id); 
    req.flash('success_msg', 'Subject deleted successfully');
    res.redirect('/subjects');
}

subjectsCtrl.searchSubjects = async (req, res) => {
    const { search } = req.body;
    const query = { name: { $regex: search, $options: 'i' } };
    const subjects = await Subject.find(query).lean();
    res.render('subjects/all-subjects', { subjects });    
};

module.exports = subjectsCtrl;