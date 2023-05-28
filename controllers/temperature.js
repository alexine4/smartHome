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

// get temperatures by room
module.exports.getByRoom = async (req, res) => {
	try {
		await temperature.findOneByRoom(req.params.roomId).then(
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
//update temperature by room
module.exports.updateByRoom = async(req,res)=>{
try {
	await temperature.updateByRoom(req.params.roomId,req.body).then(
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
//delete temperature by room
module.exports.deleteByRoom = async(req,res)=>{
try {
	await temperature.deleteByRoom(req.params.roomId).then(
		()=>{
			res.status(201).json({
				message:'Temperature record successfully deleted'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}