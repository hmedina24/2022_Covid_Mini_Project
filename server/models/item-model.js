const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        daysOfWeek: {
            type: Map,
            of: String,
            required: false
        },
        timeframeNote: {
            type: String,
            required: false
        },
        priority: {
            type: Number,
            required: false
        },
        content: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
);

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
/*const Exam = new Schema(
    {
        name:{
            type: string

        },
    }
    {timestamps: true},
);*/

module.exports = mongoose.model('item', Item);
module.exports = mongoose.model('patient', Patient);
//module.exports = mongoose.model('exam', Exam);
