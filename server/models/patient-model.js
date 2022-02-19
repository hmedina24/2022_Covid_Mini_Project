const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema({
        name: {
               type:string
        },
    },
    {timestamps: true}
);

module.exports = moongose.model('patient',Patient);	



	
