const Hospital = require('../models/hospital');

module.exports.index = async (req, res) => {
    res.render('hospital/index');
}

module.exports.createHospital = async (req, res, next) => {
      const {name, username, email, password, contact, city} = req.body;
      const hospital = new Hospital({ name, email, username, contact, city });
      const registeredHospital = await Hospital.register(hospital, password);
      res.redirect('/hospitals');
}

