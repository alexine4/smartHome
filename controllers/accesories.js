const accessory= require("../models/accesories");
const errorHandler = require("../utils/errorHandler");

module.exports.addNew = async(req,res)=>{
try {
	await accessory.create(req.body).then(
		()=>{
			res.status(201).json({message:'New accessory successfully added'})
		}
	)
} catch (error) {
	errorHandler(error)
}
}