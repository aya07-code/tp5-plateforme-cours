const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: String,
    titre: String,
    professeur_id: String,
    description: String,
    prix: Number
});

module.exports = mongoose.model('Course', courseSchema);
