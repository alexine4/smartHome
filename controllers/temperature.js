const temperature = require("../models/temperature");
const errorHandler = require("../utils/errorHandler");

//get all temperatures
module.exports.getAll = async (req, res) => {
	try {
		await temperature.findAll().then(
			temps => {
				res.status(200).json(temps)
			}
		)
	} catch (error) {
		errorHandler(error);
	}
}

// get temperatures by id
module.exports.getByID = async (req, res) => {
	try {
		await temperature.findOneByID(req.params.tempId).then(
			temp => {
				res.status(200).json(temp)
			}
		)
	} catch (error) {
		errorHandler(error);
	}
}
//create new temperature
module.exports.addNew = async(req,res)=>{
try {
	await temperature.create(req.body).then(
		()=>{
			res.status(201).json({
				message:'New temperature record successfully created'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}
//update temperature by id
module.exports.updateByID = async(req,res)=>{
try {
	await temperature.updateByID(req.params.tempId,req.body).then(
		()=>{
			res.status(201).json({
				message:'Temperature record successfully updated'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}