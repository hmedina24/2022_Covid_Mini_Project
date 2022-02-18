const Exam = require('../models/exams-modecl');


const getExams = async (req, res) => {
	await Exam.find({}, (err, exams) => {
	  if (err) {
		console.error(`[Hack.Diversity React Template] - 400 in 'getExams': ${err}`);
		return res.status(400).json({
		  success: false,
		  error: err,
		});
	  }
	  if (!exams.length) {
		console.error(`[Hack.Diversity React Template] - 404 in 'getExams': Exams not found`);
		return res.status(200).json({
		  success: true,
		  exams: [],
		});
	  }
	  console.log(`[Hack.Diversity React Template] - 200 in 'get': Exams fetched!`);
	  return res.status(200).json({
		success: true,
		exams: exams,
	  });
	}).catch(err => {
	  console.error(`[Hack.Diversity React Template] - caught error in 'getExams': ${err}`);
	  console.error(err);
	  return res.status(404).json({
		success: false,
		error: err,
	  });
	});
  };

const getExamById = async (req, res) => {
	await Exam.find({ _id: req.params.id }, (err, exams) => {
	  if (err) {
		console.error(`[Hack.Diversity React Template] - 400 in 'getExamById': ${err}`);
		throw res.status(400).json({
		  success: false,
		  error: err,
		});
	  }
	  if (!exams.length) {
		console.error(`[Hack.Diversity React Template] - 404 in 'getExamById': Exam not found`);
		return res.status(404).json({
		  success: false,
		  error: 'Exam not found',
		});
	  }
	  console.log(`[Hack.Diversity React Template] - 200 in 'getExamById': Exam fetched!`);
	  return res.status(200).json({
		success: true,
		exam: exams[0],
	  });
	}).catch(err => {
	  console.error(`[Hack.Diversity React Template] - caught error in 'getExamById': ${err}`);
	  console.error(err);
	  return err;
	});
  };

const createExam = (req , res)=>{
	
		const body = req.body;
	  
		if (!body) {
		  return res.status(400).json({
			success: false,
			error: 'You must provide an exam.',
		  });
		}
	  
		const exam = new Exam(body);
	  
		if (!exam) {
		  console.error(`[Hack.Diversity React Template] - 400 in 'createExam': 'exam' is malformed.`);
		  return res.status(400).json({
			success: false,
			message: "'exam' is malformed",
		  });
		}
	  
		return exam
		  .save()
		  .then(() => {
			console.error(`[Hack.Diversity React Template] - 201 in 'createExam': Exam created!`);
			return res.status(201).json({
			  success: true,
			  id: exam._id,
			  message: 'Exam created!',
			});
		  })
		  .catch(err => {
			console.error(`[Hack.Diversity React Template] - caught error in 'createExam'`);
			Object.keys(err.errors).forEach(errorKey => {
			  console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
			  console.error(
				`[Hack.Diversity React Template] => ${
				  ((err.errors[errorKey] || {}).properties || {}).message
				}`,
			  );
			});
			return res.status(400).json({
			  success: false,
			  error: err.errors,
			  message: err.errors.name,
			});
		  });
	  ;        
	
	}

const updateExam = async (req, res) => {
	const body = req.body;
	if (!body) {
	  console.error(`[Hack.Diversity React Template] - 400 in 'updateExam': You must provide an exam to update.`);
	  return res.status(400).json({
		success: false,
		error: 'You must provide an exam to update.',
	  });
	}
  
	const examForUpdate = {
	  _id: req.params.id,
	  patient_Id: body.patient_Id,
	  description: body.description,
	  keyfinding: body.keyfinding,
	  imagelink: body.imagelink,
	};

	try {
	  await Exam.findOneAndUpdate({ _id: req.params.id }, examForUpdate);
	} catch (err) {
	  console.error(`[Hack.Diversity React Template] - caught error in 'updateExam': ${err}`);
	  console.error(err);
	  return res.status(400).json({
		success: false,
		error: err,
	  });
	}
  
	console.log(`[Hack.Diversity React Template] - 200 in 'updateExam': Exam updated!`);
	return res.status(200).json({
	  success: true,
	  id: req.params.id,
	  message: 'Exam updated!',
	});
  };

const deleteExam = async (req, res) => {
	await Exam.findOneAndDelete({ _id: req.params.id }, (err, exam) => {
	  if (err) {
		console.error(`[Hack.Diversity React Template] - 400 in 'deleteExam': ${err}`);
		return res.status(400).json({
		  succes: false,
		  error: err,
		});
	  }
  
	  if (!exam) {
		console.error(`[Hack.Diversity React Template] - 400 in 'deleteExam': exam not found!`);
		return res.status(400).json({
		  success: false,
		  error: 'Exam not found!',
		});
	  }
  
	  return res.status(200).json({
		success: true,
		exam: exam,
	  });
	}).catch(err => {
	  console.error(`[Hack.Diversity React Template] - caught error in 'deleteExam': ${err}`);
	  console.error(err);
	  return err;
	});
  };


module.exports = {
	getExams,
	getExamById,
	createExam,
	updateExam,
	deleteExam	
};

