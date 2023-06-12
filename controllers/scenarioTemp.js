
// import modules
const scenarioTemp = require("../models/scenarioTemp");
const axios = require('axios')
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
		errorHandler(res,error);
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
		errorHandler(res,error);
	}
}
//create new scenarioTemp
module.exports.addNew = async (req, res) => {
	try {
		await scenarioTemp.findByTime(req.body).then(
			Scenario => {
				if (Scenario === null) {

					// Send request on device
					const data = req.body;
					const deviceUrl = `http://localhost:5000/device/${req.body.rooId}/ScenarioTemp/addNew`;
					console.log("Command send to device...");
					axios.get(deviceUrl, data)
						.then(response => {
							console.log('The command was successfully sent to the device.');
							console.log('Answer...');
							console.log(response.data);
							if (response.data.status === true) {
								// add to db
								scenarioTemp.create(req.body).then(
									() => {
										res.status(201).json({
											message: 'New scenario of temperature record successfully created'
										})
									}
								)
							}
						})
						.catch((error) => {
							console.log('An error occurred while sending the data.');
							console.error(error);
							res.status(404).json({
								message: "Device with this ID does not exist"
							})
						});

					
				}
				else {
					res.status(409).json({
						message: 'Scenario with this time interval already exist'
					})
				}
			}
		)
	} catch (error) {
		errorHandler(res,error)
	}
}
//update scenarioTemp by room
module.exports.updateById = async (req, res) => {
	try {
		await scenarioTemp.findByTime(req.body).then(
			Scenario => {
				if (Scenario === null || Scenario.dataValues.scenarioId == req.params.scenarioId) {
					// Send request on device
					const data = req.body;
					const deviceUrl = `http://localhost:5000/device/${req.body.rooId}/ScenarioTemp/${req.body.scenarioId}`;
					console.log("Command send to device...");
					axios.patch(deviceUrl, data)
						.then(response => {
							console.log('The command was successfully sent to the device.');
							console.log('Answer...');
							console.log(response.data);
							if (response.data.status === true) {
								// add to db
								scenarioTemp.updateById(req.params.scenarioId, req.body).then(
									() => {
										res.status(201).json({
											message: 'Scenario of temperature record successfully updated'
										})
									}
								)
							}
						})
						.catch((error) => {
							console.log('An error occurred while sending the data.');
							console.error(error);
							res.status(404).json({
								message: "Device with this ID does not exist"
							})
						});
					
				}
				else {
					res.status(409).json({
						message: 'Scenario with this time interval already exist'
					})
				}
			}

		)
	} catch (error) {
		errorHandler(res,error)
	}
}
//find active scenarioTemp by room
module.exports.getActual = async (req, res) => {
	try {
		await scenarioTemp.updateStatusFalse(req.body).then(
			() => {
				scenarioTemp.findActive(req.params.roomId,getTime()).then(
					scenario => {
						if (scenario !==null) {
						scenario.active = true
						scenarioTemp.updateById(scenario.scenarioId,scenario) 
						res.status(201).json(scenario)
						}else{
							res.status(201).json(null)
						}
						 
					}
				)
			}
		)
	} catch (error) {
		errorHandler(res,error)
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
		errorHandler(res,error)
	}
}

function getTime() {
	const currentTime = new Date();
	const hours = currentTime.getHours().toString().padStart(2, '0');
	const minutes = currentTime.getMinutes().toString().padStart(2, '0');
	const timeString = `${hours}:${minutes}`;
	return timeString
}