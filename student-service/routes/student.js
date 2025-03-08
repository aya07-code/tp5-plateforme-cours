const router = require('express').Router();
const Student = require('../models/Student');
const verifyToken = require('../middleware/verifyToken');

router.get('/all', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

router.post('/add', verifyToken, async (req, res) => {
    const student = new Student({
        id: req.body.id,
        nom: req.body.nom,
        email: req.body.email,
        cours: req.body.cours
    });
    try {
        const savedStudent = await student.save();
        res.send(savedStudent);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/enroll/:etudiant_id/:cours_id', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.params.etudiant_id);
        student.cours.push(req.params.cours_id);
        const savedStudent = await student.save();
        res.send(savedStudent);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/enrolledCourses/:etudiant_id', async (req, res) => {
    const student = await Student.findById(req.params.etudiant_id);
    res.send(student.cours);
});

module.exports = router;
