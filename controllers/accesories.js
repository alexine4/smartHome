const accessory = require("../models/accesories");
const properties = require("../models/properties");
const errorHandler = require("../utils/errorHandler");

module.exports.addNew = async (req, res) => {
	try {
		await accessory.findByRoomAndName(req.body).then(
			Accessory => {
				if (Accessory === null) {
					accessory.create(req.body).then(
						() => {
							accessory.findByRoomAndName(req.body).then(
								AccessoryNew => {
									req.body.accessoryId = AccessoryNew.accessoryId
									properties.create(req.body).then(
										() => {
											res.status(201).json({ message: 'New accessory successfully added' })
										}
									)
								}
							)
						}
					)
				} else {
					res.status(409).json({ message: 'Accessory with this name already exists' })
				}
			}
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.getByRoom = async (req, res) => {
	try {
		await accessory.findByRoom(req.params.roomId).then(
			Accessory => {
				if (Accessory.length >1) {
					//fast way
					// not right method because we have many query to DB we must using query with join into model
					for (let index = 0; index < Accessory.length; index++) {
						properties.findByAccessory(Accessory[index].dataValues.accessoryId).then(
							property => {
								Accessory[index].dataValues.status = property.dataValues.status
								Accessory[index].dataValues.brightnessLevel = property.dataValues.brightnessLevel
								Accessory[index].dataValues.volume = property.dataValues.volume
								Accessory[index].dataValues.ventilationRate = property.dataValues.ventilationRate
								if (index === Accessory.length-1) {
									res.status(200).json(Accessory)
								}
							}
						)
					}
				}else{
					res.status(200).json(null)
				}
			}
		)
	} catch (error) {
		errorHandler(res,error)
	}
}

module.exports.updateByID = async(req,res)=>{
try {
	await accessory.update(req.params.accessoryId,req.body).then(
		()=>{
			properties.update(req.body).then(
				()=>{
					res.status(202).json({message:'Accessory updated successfully'})
				}
			)
		}
	)
} catch (error) {
	errorHandler(res,error)
}
}
module.exports.deleteByID = async(req,res)=>{
try {
	await accessory.delete(req.params.accessoryId).then(
		()=>{
			properties.deleteByAccessory(req.params.accessoryId).then(
				()=>{
					res.status(200).json({message:'Accessory deleted successfully'})
				}
			)
		}
	)
} catch (error) {
	errorHandler(res,error)
}
}