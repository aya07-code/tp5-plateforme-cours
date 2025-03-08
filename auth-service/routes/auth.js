const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken'); // Assurez-vous que ce middleware est importé

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email ou mot de passe incorrect');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email ou mot de passe incorrect');

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    res.header('authorization', token).send(token);
});

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.send(user);
    } catch (err) {
        res.status(400).send('Utilisateur non trouvé');
    }
});

module.exports = router;
