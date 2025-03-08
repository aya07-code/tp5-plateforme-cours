const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    id: String,
    name: String,
    bio: String,
    cours: [String]
});

module.exports = mongoose.model('Teacher', teacherSchema);
