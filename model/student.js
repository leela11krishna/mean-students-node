const mongoose = require('mongoose');

//Model to hold the student information
var Student = mongoose.model('Student', {
    name: { type: String, unique: true, required: true },
    age: { type: Number },
    gender: { type: String },
    major: { type: String },
    campus: { type: String }
});

module.exports = { Student };