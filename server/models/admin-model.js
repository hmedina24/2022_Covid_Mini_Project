const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema(
    {
        patient_Id: {
            type: String,
            required: true
        },
        key_finding: {
            type: String,
            required: false
        },
        png_filename: {
            type: String,
            required: true
        },
        exam_Id: {
            type: String,
            required: false
        },
    }, { timestamps: true }, );


module.exports = mongoose.model('admin',Admin);

