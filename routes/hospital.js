const express = require('express');
const router = express.Router();
const passport = require('passport');
const hospital = require('../controllers/hospital');

router.route("/")
    .get(hospital.index)
    .post(hospital.login)

router.post("/new", hospital.createHospital)

router.get("/dashboard/:hospitalId/", hospital.dashboard)

router.post("/:hospitalId/patient", hospital.getPatient)
router.post("/:hospitalId/patient/new", hospital.newPatient)
router.get("/:hospitalId/patient/:patientId/cnpl", hospital.cnplPatient)

module.exports = router;