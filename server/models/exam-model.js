const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


const Exam = new Schema(
    {
        patient_Id: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        keyfinding: {
            type: String,
            required: false
        },
        imagelink: {
            type: String,
            required: true
        },
    }, { timestamps: true }, );


module.exports = moongose.model('exam',exam);
