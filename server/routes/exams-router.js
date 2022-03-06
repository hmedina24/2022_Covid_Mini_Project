const express = require('express');

const ExamsController = require('../controllers/exams-controller');

const router = express.Router();

router.get('/exams', ExamsController.getExams);
router.get('/exam/:id', ExamsController.getExamById);
router.post('/exam', ExamsController.createExam);
router.put('/exam/:id', ExamsController.updateExam);
router.delete('/exam/:id', ExamsController.deleteExam);

module.exports = router;
