const scenarioTemp = require("../models/scenarioTemp");
const errorHandler = require("../utils/errorHandler");

//get all scenarios by rooms
module.exports.getAll = async (req, res) => {
	try {
		await scenarioTemp.findAll(req.params.roomId).then(
			temps => {
				res.status(200).json(temps)
			}
		)
	} catch (error) {
		errorHandler(error);
	}
}

// get scenarioTemps by room
module.exports.getById = async (req, res) => {
	try {
		await scenarioTemp.findOneByID(req.params.scenarioId).then(
			temp => {
				res.status(200).json(temp)
			}
		)
	} catch (error) {
		errorHandler(error);
	}
}
//create new scenarioTemp
module.exports.addNew = async(req,res)=>{
try {
	await scenarioTemp.create(req.body).then(
		()=>{
			res.status(201).json({
				message:'New scenario of temperature record successfully created'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}
//update scenarioTemp by room
module.exports.updateByRoom = async(req,res)=>{
try {
	await scenarioTemp.updateByRoom(req.params.roomId,req.body).then(
		()=>{
			res.status(201).json({
				message:'Scenario of temperature record successfully updated'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}
//delete scenarioTemp by room
module.exports.deleteById = async(req,res)=>{
try {
	await scenarioTemp.deleteByID(req.params.scenarioId).then(
		()=>{
			res.status(201).json({
				message:'Scenario of temperature record successfully deleted'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}