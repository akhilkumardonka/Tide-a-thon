const express = require('express');
const router = express.Router();
const patient = require('../controllers/patient');

router.get("/", patient.index)
router.post("/", patient.loginPatient)

router.post("/new", patient.createPatient)

router.get("/dashboard/:patientId", patient.patientDashboard)
router.post("/dashboard/:patientId/cnpl", patient.patientcnpl)

router.get("/details", patient.patientDetails)

router.get("/paybill", patient.patientPayBill)

router.get("/findHospital", patient.patientFindHospital)

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Successfully Logged Out.' });
    res.redirect("/patients");
  });

module.exports = router;