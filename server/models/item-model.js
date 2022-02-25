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

/*const Admin = new Schema(
    {
    
    }
)*/
const Image = new Schema(
    {
        patiend_Id:{
            type: String,
            require: true

        },
        exam_Id:{
            type: String,
            require: true

        },
        png_filename:{
            type: String,
            require: true

        },
        key_findings:{
            type: String,
            require: true

        },
    },
    {timestamps: true},
    
);

module.exports = mongoose.model('item', Item);
module.exports = mongoose.model('patient', Patient);
module.exports = mongoose.model('image', Image);
