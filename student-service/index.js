const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoute = require('./routes/student');

app.use(express.json());

app.use('/api/students', studentRoute);

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/microservices', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connecté à MongoDB');
        app.listen(3001, () => console.log('Serveur en cours d\'exécution sur le port 3001'));
    } catch (err) {
        console.error('Échec de la connexion à MongoDB', err);
    }
}

startServer();
