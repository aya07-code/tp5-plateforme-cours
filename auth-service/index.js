const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

app.use(express.json());

app.use('/api/auth', authRoute);

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/microservices', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connecté à MongoDB');
        app.listen(3003, () => console.log('Serveur en cours d\'exécution sur le port 3003'));
    } catch (err) {
        console.error('Échec de la connexion à MongoDB', err);
    }
}

startServer();
