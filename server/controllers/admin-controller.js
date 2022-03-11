const Admin = require('../models/admin-model');


const getAdmins = async (req, res) => {
	await Admin.find({}, (err, admins) => {
	  if (err) {
		console.error(`[Hack.Diversity React Template] - 400 in 'getAdmins': ${err}`);
		return res.status(400).json({
		  success: false,
		  error: err,
		});
	  }
	  if (!admins.length) {
		console.error(`[Hack.Diversity React Template] - 404 in 'getAdmins': Admin not found`);
		return res.status(200).json({
		  success: true,
		  admins: [],
		});
	  }
	  console.log(`[Hack.Diversity React Template] - 200 in 'get': Admin fetched!`);
	  return res.status(200).json({
		success: true,
		admins: admins,
	  });
	}).catch(err => {
	  console.error(`[Hack.Diversity React Template] - caught error in 'getAdmins': ${err}`);
	  console.error(err);
	  return res.status(404).json({
		success: false,
		error: err,
	  });
	});
  };

const getAdminById = async (req, res) => {
	await Admin.find({ _id: req.params.id }, (err, admins) => {
	  if (err) {
		console.error(`[Hack.Diversity React Template] - 400 in 'getAdminById': ${err}`);
		throw res.status(400).json({
		  success: false,
		  error: err,
		});
	  }
	  if (!admins.length) {
		console.error(`[Hack.Diversity React Template] - 404 in 'getAdminById': Admin not found`);
		return res.status(404).json({
		  success: false,
		  error: 'Admin not found',
		});
	  }
	  console.log(`[Hack.Diversity React Template] - 200 in 'getAdminById': Exam fetched!`);
	  return res.status(200).json({
		success: true,
		admin: admins[0],
	  });
	}).catch(err => {
	  console.error(`[Hack.Diversity React Template] - caught error in 'getExamById': ${err}`);
	  console.error(err);
	  return err;
	});
  };

const createAdmin = (req , res)=>{
	
		const body = req.body;
	  
		if (!body) {
		  return res.status(400).json({
			success: false,
			error: 'You must provide an admin.',
		  });
		}
	  
		const admin = new Admin(body);
	  
		if (!admin) {
		  console.error(`[Hack.Diversity React Template] - 400 in 'createAdmin': 'admin' is malformed.`);
		  return res.status(400).json({
			success: false,
			message: "'admin' is malformed",
		  });
		}
	  
		return admin
		  .save()
		  .then(() => {
			console.error(`[Hack.Diversity React Template] - 201 in 'createAdmin': Admin created!`);
			return res.status(201).json({
			  success: true,
			  id: admin._id,
			  message: 'Admin created!',
			});
		  })
		  .catch(err => {
			console.error(`[Hack.Diversity React Template] - caught error in 'createAdmin'`);
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

const updateAdmin = async (req, res) => {
	const body = req.body;
	if (!body) {
	  console.error(`[Hack.Diversity React Template] - 400 in 'updateAdmin': You must provide an exam to update.`);
	  return res.status(400).json({
		success: false,
		error: 'You must provide an admin to update.',
	  });
	}
  
	const adminForUpdate = {
	  _id: req.params.id,
	  patient_Id: body.patient_Id,
	  description: body.description,
	  keyfinding: body.keyfinding,
	  imagelink: body.imagelink,
	};

	try {
	  await Admin.findOneAndUpdate({ _id: req.params.id }, adminForUpdate);
	} catch (err) {
	  console.error(`[Hack.Diversity React Template] - caught error in 'updateAdmin': ${err}`);
	  console.error(err);
	  return res.status(400).json({
		success: false,
		error: err,
	  });
	}
  
	console.log(`[Hack.Diversity React Template] - 200 in 'updateAdmin': Admin updated!`);
	return res.status(200).json({
	  success: true,
	  id: req.params.id,
	  message: 'Admin updated!',
	});
  };

const deleteAdmin = async (req, res) => {
	await Admin.findOneAndDelete({ _id: req.params.id }, (err, admin) => {
	  if (err) {
		console.error(`[Hack.Diversity React Template] - 400 in 'deleteAdmin': ${err}`);
		return res.status(400).json({
		  succes: false,
		  error: err,
		});
	  }
  
	  if (!admin) {
		console.error(`[Hack.Diversity React Template] - 400 in 'deleteAdmin': admin not found!`);
		return res.status(400).json({
		  success: false,
		  error: 'Admin not found!',
		});
	  }
  
	  return res.status(200).json({
		success: true,
		admin: admin,
	  });
	}).catch(err => {
	  console.error(`[Hack.Diversity React Template] - caught error in 'deleteAdmin': ${err}`);
	  console.error(err);
	  return err;
	});
  };


module.exports = {
	getAdmins,
	getAdminById,
	createAdmin,
	updateAdmin,
	deleteAdmin	
};


