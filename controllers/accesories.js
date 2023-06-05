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
									console.log(req.body);
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
		errorHandler(error)
	}
}