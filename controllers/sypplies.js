// import modules
const sypplies = require("../models/supplys");
const limits = require("../models/limits");
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

//update sypply
module.exports.updateById = async(req,res)=>{
try {
	await sypplies.updateById(req.params.sypplyId,req.body).then(
		()=>{
			res.status(200).json({message:'Sypply successfully updated'})
		}
	)
} catch (error) {
	errorHandler(error)
}
}
//delete sypply
module.exports.deleteById = async(req,res)=>{
try {
	await sypplies.deleteById(req.params.sypplyId,req.user.houseId).then(
		()=>{
			res.status(200).json({message:'Sypply successfully deleted'})
		}
	)
} catch (error) {
	errorHandler(error)
}
}

// get sypply by id
module.exports.getByID = async(req,res)=>{
	try {
		await sypplies.findByID(req.params.sypplyId).then(
			sypplies=>{
				res.status(200).json(sypplies)
			}
		)
	} catch (error) {
		errorHandler(error)
	}
}
// get limit by sypply
module.exports.getLimit = async(req,res)=>{
	try {
		await limits.findBySypply(req.params.sypplyId).then(
			limit=>{
				res.status(200).json(limit)
			}
		)
	} catch (error) {
		errorHandler(error)
	}
}

//add new sypplies
module.exports.addNewLimit = async(req,res)=>{
	try {
		await limits.findBySypply(req.params.sypplyId).then(
			limit=>{
				if (limit===null) {
					limits.create(req.body).then(
						()=>{
							res.status(201).json({message:"New sypply successfully added"})
						}
					)
				}else{
					limits.update(req.body).then(
						()=>{
							res.status(201).json({message:"Sypply successfully updated"})
						}
					)
				}
			}
		)
	} catch (error) {
		errorHandler(error)
	}
	}