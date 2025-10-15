const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  department: { type: String, required: true }, // e.g., "CSE", "ECE"
  code: { type: String, required: true },       // e.g., "CS101"
  description: String,
  instructor: String,
  schedule: String
});

module.exports = mongoose.model('Courses', courseSchema);
