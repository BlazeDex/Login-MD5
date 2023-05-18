const {Schema, model} = require('mongoose');

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = model('Subject', SubjectSchema);
