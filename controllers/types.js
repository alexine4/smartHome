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
module.exports.updateByID = async (req, res) => {
	try {
		await types.update(req.params.typeId, req.body.typeName).then(() => {
			res.status(200).json({
				message: 'Type create successfully'
			})
		})
	} catch (error) {
		errorHandler(error)
	}
}
module.exports.deleteByID = async (req, res) => {
	try {
		await types.delete(req.params.typeId).then(() => {
			res.status(202).json({
				message: 'Type remove successfully'
			})
		})
	} catch (error) {
		errorHandler(error)
	}
}