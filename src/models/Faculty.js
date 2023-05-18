const {Schema, model} = require('mongoose');

const FacultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = model('Faculty', FacultySchema);
