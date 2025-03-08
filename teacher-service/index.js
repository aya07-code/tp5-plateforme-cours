const express = require('express');
const app = express();
const mongoose = require('mongoose');
const teacherRoute = require('./routes/teacher');

app.use(express.json());

app.use('/api/teachers', teacherRoute);

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/microservices', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connecté à MongoDB');
        app.listen(3002, () => console.log('Serveur en cours d\'exécution sur le port 3002'));
    } catch (err) {
        console.error('Échec de la connexion à MongoDB', err);
    }
}

startServer();
