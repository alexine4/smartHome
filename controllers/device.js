const axios = require('axios')
const using = require('../models/using')

//=========================================================================================================================================================================================================================================
// request to device

module.exports.getIndicators = (meterId) => {
	//for full programm
	//const deviceUrl = 'http://' + req.body.homeIp + '/device';

	//for tests
	const deviceUrl = `http://localhost:5000/device/getIndicators/${meterId}`;

	const intervalInMilliseconds = 1000 * 60 * 60; //60m

	setInterval(() => {
		const dateTime = new Date(); // current date and time
		const hours = dateTime.getHours(); // get hours
		if (hours ===23) {
			// Object with parametres
		const data = {
			test: 'test data'
		};
		console.log("Command send to device...");

		// Send request on device
		axios.get(deviceUrl, data)
			.then(response => {
				console.log('The command was successfully sent to the device.');
				console.log('Answer...');
				console.log(response.data);
				using.findOne(meterId,dateTime).then(
					Using => {
						if (Using === null) {
							using.create(response.data)
						} else {
							using.update(response.data)
						}
					}
				)
				console.log('-----------------------------------------------------------');
				//res.status(200).json(response.data)
			})
			.catch((error) => {
				console.log('An error occurred while sending the data.');
				console.error(error);
				res.status(404).json({
					message: "Device with this ID does not exist"
				})
			});
		}
		

	}, intervalInMilliseconds);

}