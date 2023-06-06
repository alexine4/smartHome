// import modules
const sypplies = require("../models/supplys");
const errorHandler = require("../utils/errorHandler");

//add new sypplies
module.exports.addNew = async(req,res)=>{
try {
	await sypplies.findByName(req.user.houseId,req.body).then(
		sypply=>{
			if (sypply===null) {
				sypplies.create(req.user.houseId,req.body).then(
					()=>{
						res.status(201).json({message:"New sypply successfully added"})
					}
				)
			}else{
				res.status(409).json({message:"Sypply with this name at this home already exist`s"})
			}
		}
	)
} catch (error) {
	errorHandler(error)
}
}
// get all by home
module.exports.getAll = async(req,res)=>{
try {
	await sypplies.findAll(req.user.houseId).then(
		sypplies=>{
			res.status(200).json(sypplies)
		}
	)
} catch (error) {
	errorHandler(error)
}
}