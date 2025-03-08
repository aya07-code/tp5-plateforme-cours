const router = require('express').Router();
const Teacher = require('../models/Teacher');
const verifyToken = require('../middleware/verifyToken');

router.get('/all', async (req, res) => {
    const teachers = await Teacher.find();
    res.send(teachers);
});

router.post('/add', verifyToken, async (req, res) => {
    const teacher = new Teacher({
        id: req.body.id,
        name: req.body.name,
        bio: req.body.bio,
        cours: req.body.cours
    });
    try {
        const savedTeacher = await teacher.save();
        res.send(savedTeacher);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/assign/:professeur_id/:cours_id', verifyToken, async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.professeur_id);
        teacher.cours.push(req.params.cours_id);
        const savedTeacher = await teacher.save();
        res.send(savedTeacher);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/enrolledStudents/:cours_id', async (req, res) => {
    const students = await Teacher.find({ cours: req.params.cours_id });
    res.send(students);
});

module.exports = router;
