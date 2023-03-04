const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    contact:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true
    },
    bmi:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    sex_male:{
        type: String,
        required: true,
    },
    smoker_yes:{
        type: String,
        required: true,
    },
    region:{
        type: String,
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'hospital'
    },
    children :{
        type: String
    },
    cnpl_request:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('patient', patientSchema);