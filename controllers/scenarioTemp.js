
// import modules
const scenarioTemp = require("../models/scenarioTemp");
const errorHandler = require("../utils/errorHandler");

//get all scenarios by rooms
module.exports.getAll = async (req, res) => {
	try {
		await scenarioTemp.findAllByRoom(req.params.roomId).then(
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
module.exports.addNew = async (req, res) => {
	try {
		await scenarioTemp.findByTime(req.body).then(
			Scenario => {
				if (Scenario === null) {
					scenarioTemp.create(req.body).then(
						() => {
							res.status(201).json({
								message: 'New scenario of temperature record successfully created'
							})
						}
					)
				}
				else {
					res.status(409).json({
						message: 'Scenario with this time interval already exist'
					})
				}
			}
		)
	} catch (error) {
		errorHandler(error)
	}
}
//update scenarioTemp by room
module.exports.updateById = async (req, res) => {
	try {
		await scenarioTemp.findByTime(req.body).then(
			Scenario => {
				if (Scenario === null || Scenario.dataValues.scenarioId == req.params.scenarioId) {
					scenarioTemp.updateById(req.params.scenarioId, req.body).then(
						() => {
							res.status(201).json({
								message: 'Scenario of temperature record successfully updated'
							})
						}
					)
				}
				else {
					res.status(409).json({
						message: 'Scenario with this time interval already exist'
					})
				}
			}

		)
	} catch (error) {
		errorHandler(error)
	}
}
//find active scenarioTemp by room
module.exports.getActual = async (req, res) => {
	try {
		await scenarioTemp.updateStatusFalse(req.body).then(
			() => {
				scenarioTemp.findActive(getTime()).then(
					scenario => {
						/* scenario.active = true
						console.log(scenario);
						scenarioTemp.updateById(scenario.scenarioId,scenario) */
						res.status(201).json(scenario)
					}
				)
			}
		)
	} catch (error) {
		errorHandler(error)
	}
}
//delete scenarioTemp by room
module.exports.deleteById = async (req, res) => {
	try {
		await scenarioTemp.deleteByID(req.params.scenarioId).then(
			() => {
				res.status(201).json({
					message: 'Scenario of temperature record successfully deleted'
				})
			}
		)
	} catch (error) {
		errorHandler(error)
	}
}

function getTime() {
	const currentTime = new Date();
	const hours = currentTime.getHours().toString().padStart(2, '0');
	const minutes = currentTime.getMinutes().toString().padStart(2, '0');
	const timeString = `${hours}:${minutes}`;
	return timeString
}