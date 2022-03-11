const express = require('express')

const AdminController = require('../controllers/exams-controller')

const router = express.Router()

router.get('/admin', AdminController.getExams);

module.exports = router

