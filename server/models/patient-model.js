const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        PATIENT_ID:{
            type: String,
            required: true
        },
        AGE:{
            type: Number,
            required: true
        },
        SEX:{
            type: String,
            required: true
        },
        RACE:{
            type: String,
            required: true
        },
        ZIP:{
            type: Number,
            required: true
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model('patient', Patient);

//this is what the csv file is getting collected from mongodb
//mongoimport --type csv -d item -c patients --headerline --uri 'mongodb+srv://Admin:hdswe2022@cluster0.tcqrk.mongodb.net/item' data.csv