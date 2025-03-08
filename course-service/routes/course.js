const router = require('express').Router();
const Course = require('../models/Course');
const verifyToken = require('../middleware/verifyToken');

router.get('/all', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

router.post('/add', verifyToken, async (req, res) => {
    const course = new Course({
        id: req.body.id,
        titre: req.body.titre,
        professeur_id: req.body.professeur_id,
        description: req.body.description,
        prix: req.body.prix
    });
    try {
        const savedCourse = await course.save();
        res.send(savedCourse);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedCourse);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const removedCourse = await Course.findByIdAndRemove(req.params.id);
        res.send(removedCourse);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/search', async (req, res) => {
    const keyword = req.query.keyword;
    const courses = await Course.find({ titre: new RegExp(keyword, 'i') });
    res.send(courses);
});

module.exports = router;
