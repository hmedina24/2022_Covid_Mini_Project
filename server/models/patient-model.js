const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        PATIENT_ID: { type: String, required: true},
        AGE: { type: Number, required: true},
        SEX: { type: String, required: true},
        RACE: { type: String, required: true},
        ZIP: { type: String, required: true},
        LATEST_BMI: { type: Number, required: true},
    },
    { timestamps: true },
);

module.exports = mongoose.model('patient', Patient);