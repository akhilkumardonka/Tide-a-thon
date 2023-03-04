const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const HospitalSchema = new Schema({
    name:{
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    contact: {
      type: Number,
      required: true
    },
    city:{
      type: String,
      required: true
    },
  });
  
  HospitalSchema.plugin(passportLocalMongoose);
  
  module.exports = mongoose.model('hospital', HospitalSchema);