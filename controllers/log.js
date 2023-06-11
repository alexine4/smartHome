const aLog = require("../models/actionLog");
const errorHandler = require("../utils/errorHandler");


module.exports.addNew = async(req,res)=>{
try {
	await aLog.create(req.body.message,req.user.houseId,req.body.checked).then(
		()=>{
			res.status(201).json({message:'log create'})
		}
	)
} catch (error) {
	errorHandler(res,error)
}
}
module.exports.updateById = async(req,res)=>{
try {
	await aLog.updateById(req.params.aLogId).then(
		()=>{
			res.status(201).json({message:'log checked'})
		}
	)
} catch (error) {
	errorHandler(res,error)
}
}
module.exports.updateByHouse = async(req,res)=>{
try {
	await aLog.updateByHouse(req.user.houseId).then(
		()=>{
			res.status(201).json({message:'log checked'})
		}
	)
} catch (error) {
	errorHandler(res,error)
}
}
module.exports.getAllByHouse = async(req,res)=>{
try {
	await aLog.findAllByHouse(req.user.houseId).then(
		logs=>{
			res.status(200).json(logs)
		}
	)
} catch (error) {
	errorHandler(res,error)
}
}
module.exports.getActive = async(req,res)=>{
try {
	await aLog.countNonChecked(req.user.houseId).then(
		logs=>{
			res.status(200).json(logs)
		}
	)
} catch (error) {
	errorHandler(res,error)
}
}