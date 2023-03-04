const Hospital = require('../models/hospital');
const Patient = require('../models/patient');

module.exports.index = async (req, res) => {
    res.render('patient/index');
}

module.exports.loginPatient = async (req, res, next) => {
    const {email, password} = req.body
    const patient = await Patient.find({"email" : email})
    const patientLink = String("/patients/dashboard/" + patient[0]._id.toString())
    res.redirect(patientLink);
}

module.exports.createPatient = async (req, res, next) => {
      const {name, username, email, password, sex, age, smoker, contact, city} = req.body;
      const patient = new Patient({ name, email, username, sex, age, smoker, contact, city });
      const registeredPatient = await Patient.register(patient, password);
      res.redirect('/patients');
}

module.exports.patientDashboard = async (req, res) => {
    const {patientId} = req.params
    const patient = await Patient.findById(patientId)
    res.render('patient/dashboard', {patient});
}

module.exports.patientcnpl = async (req, res) => {
    const {patientId} = req.params
    const patient = req.body.patient
    const hospital = await Hospital.findById(patient.hospital)
    const patient_updated = await Patient.findByIdAndUpdate({"_id": patientId}, {"cnpl_request" : true});
    const patientLink = String("/patients/dashboard/" + patient_updated._id.toString())
    res.redirect(patientLink);
}

module.exports.patientDetails = async (req, res) => {
    const {username} = req.params;
    const patient = await Patient.findOne({username : username});
    res.render('patient/details', {patient});
}

module.exports.patientPayBill = async (req, res) => {
    res.render('patient/payBill');
}

module.exports.patientFindHospital = async (req, res) => {
    const {username} = req.params;
    const patient = await Patient.findOne({username : username});
    res.render('patient/findHospital');
}