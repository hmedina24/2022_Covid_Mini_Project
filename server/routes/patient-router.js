const express = require('express')

const PatientController = require('../controllers/patient-controller')

const router = express.Router()

router.get('/patient', PatientController.getPatients);

module.exports = router
