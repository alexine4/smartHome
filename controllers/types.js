const { type } = require("os");
const types = require("../models/types")
const errorHandler = require("../utils/errorHandler");


module.exports.getAll = async (req, res) => {
	try {
		await types.findAll()
			.then(Types => {
				if (Types !== null) {
					res.status(200).json(Types)
				} else {
					res.status(204).json({
						message: 'No content found'
					})
				}
			})
	} catch (error) {
		errorHandler(error)
	}
}
module.exports.getByID = async (req, res) => {
	try {
		await types.findOneById(req.params.typeId)
			.then(Types => {
				if (Types !== null) {
					res.status(200).json(Types)
				} else {
					res.status(204).json({
						message: 'No content found'
					})
				}
			})
	} catch (error) {
		errorHandler(error)
	}
}

module.exports.addNew = async (req, res) => {
	try {
		await types.findOneByName(req.body.typeName).then(
			result => {
				if (result === null) {
					types.create(req.body.typeName).then(() => {
						res.status(201).json({
							message: 'Type create successfully'
						})
					})
				} else {
					res.status(409).json({
						message: 'Type with this name already exist`s'
					})
				}
			}
		)

	} catch (error) {
		errorHandler(error)
	}
}
module.exports.updateByName= async (req, res) => {
	try {
		//check type for exists
		await types.findOneByName(req.body.newTypeName).then(
			typeCheck=>{
				if(typeCheck===null){
					// take type by name
					types.findOneByName(req.params.typeName).then(type=>{
						if (type !==null) {
							types.update(type.dataValues.typeId, req.body.newTypeName).then(() => {
								res.status(200).json({
									message: 'Type updated successfully'
								})
							})
						}else{
							res.status(404).json({
								message: 'Type with this name don`t exist'
							})
						}
					})
				} // if one type with a new name already exist
				else{
					res.status(404).json({
						message: 'Type with name where you need change already exist'
					})
				}
			}
		)
		 
		
	} catch (error) {
		errorHandler(error)
	}
}
module.exports.deleteByName = async (req, res) => {
	try {
		await types.findOneByName(req.params.typeName).then(type=>{
			if (type !==null) {
				types.delete(req.params.typeName).then(() => {
					res.status(202).json({
						message: 'Type remove successfully'
					})
				})
			}else{
				res.status(404).json({
					message: 'Type with this name don`t exist'
				})
			}
		})
		
	} catch (error) {
		errorHandler(error)
	}
}