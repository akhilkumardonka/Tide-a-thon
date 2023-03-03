const express = require('express');
const router = express.Router();
const hospital = require('../controllers/hospital');

router.get("/", hospital.index)

router.post("/new", hospital.createHospital)

module.exports = router;