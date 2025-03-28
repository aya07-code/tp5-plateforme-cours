const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).send('Accès refusé');

    try {
        const verified = jwt.verify(token, 'secretKey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Token invalide');
    }
};

module.exports = verifyToken;
