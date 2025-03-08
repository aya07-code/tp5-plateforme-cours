const express = require('express');
const app = express();
const mongoose = require('mongoose');
const courseRoute = require('./routes/course');

app.use(express.json());

app.use('/api/courses', courseRoute);

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/microservices', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        app.listen(3000, () => console.log('Server running on port 3000'));
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

startServer();
