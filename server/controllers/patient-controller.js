const Patient =  require('../models/patient-model')

getPatients = async (req, res) => {
	await Patient.find({}, (err, patients) => {
        if(err) {
            console.error(`Hack.Diversity React Template] - 400 in 'getPatients': ${err}`);
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
        if (!patients.length) {
            console.error(`[Hack.Diversity React Template] - 404 in 'getPatients': Patients not found`);
            return res.status(200).json({
              success: true,
              patients: [],
            });
          }
          console.log(`[Hack.Diversity React Template] - 200 in 'getPatients': Patients fetched!`);
          return res.status(200).json({
            success: true,
            patients: patients,
          });
        }).catch(err => {
          console.error(`[Hack.Diversity React Template] - caught error in 'getPatients': ${err}`);
          console.error(err);
          return res.status(404).json({
            success: false,
            error: err,
          });
        });
};
module.exports = {
    getPatients,
}

