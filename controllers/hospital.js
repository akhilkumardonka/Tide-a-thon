const Hospital = require('../models/hospital');
const Patient = require('../models/patient');
const axios = require('axios');

module.exports.index = async (req, res) => {
    res.render('hospital/index');
}

module.exports.createHospital = async (req, res, next) => {
      const {name, username, email, password, contact, city} = req.body;
      const hospital = new Hospital({ name, email, username, contact, city });
      const registeredHospital = await Hospital.register(hospital, password);
      res.redirect('/hospitals');
}

module.exports.login = async (req, res, next) => {
    const {email, password} = req.body
    const hospital = await Hospital.find({"email" : email})
    const hospitalLink = String("/hospitals/dashboard/" + hospital[0]._id.toString())
    res.redirect(hospitalLink);
}

module.exports.dashboard = async (req, res, next) => {
    const {hospitalId} = req.params
    const hospital = await Hospital.findById(hospitalId)
    const patient = false
    const insurance_cost = false
    res.render('hospital/dashboard', {hospital, patient, insurance_cost});
}

module.exports.getPatient = async (req, res, next) => {

    const {hospitalId} = req.params
    const hospital = await Hospital.findById(hospitalId)

    const {patientName} = req.body
    const patient = await Patient.find({name : patientName})
    const insurance_cost = false
    res.render('hospital/dashboard', {hospital, patient, insurance_cost});
}

module.exports.newPatient = async (req, res, next) => {

    const {hospitalId} = req.params
    const hospital = await Hospital.findById(hospitalId)

    const patient = new Patient({... req.body.patient, "hospital": hospital._id});
    await patient.save();
    
    const insurance_cost = false
    res.render('hospital/dashboard', {hospital, patient, insurance_cost});
}

module.exports.cnplPatient = async (req, res, next) => {

    const {hospitalId, patientId} = req.params
    const hospital = await Hospital.findById(hospitalId)
    const patient = await Patient.find({_id : patientId})

    console.log(patient)

    axios.post('http://0.0.0.0:8000/prediction/', {
        age: 30,
        bmi: 23,
        smoker_yes: 1,
        region: "northwest",
        sex_male: 1,
        children: 4
      })
      .then((response) => {
        insurance_cost = response.data.insurance_cost;
        res.render('hospital/dashboard', {hospital, patient, insurance_cost});
      }, (error) => {
        console.log(error);
      });
}