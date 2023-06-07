const temperature = require("../models/temperature");
const errorHandler = require("../utils/errorHandler");
const axios = require('axios');

//get all temperatures
module.exports.getAll = async (req, res) => {
	try {
		await temperature.findAll().then(
			temps => {
				res.status(200).json(temps)
			}
		)
	} catch (error) {
		errorHandler(error);
	}
}

// get temperatures by room
module.exports.getByRoom = async (req, res) => {
	try {
		await temperature.findOneByRoom(req.params.roomId).then(
			temp => {
				res.status(200).json(temp)
			}
		)
	} catch (error) {
		errorHandler(error);
	}
}
//create new temperature
module.exports.addNew = async(req,res)=>{
try {
	await temperature.create(req.body).then(
		()=>{
			res.status(201).json({
				message:'New temperature record successfully created'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}
//update temperature by room
module.exports.updateByRoom = async(req,res)=>{
try {
	await temperature.updateByRoom(req.params.roomId,req.body).then(
		()=>{
			res.status(201).json({
				message:'Temperature record successfully updated'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}
//delete temperature by room
module.exports.deleteByRoom = async(req,res)=>{
try {
	await temperature.deleteByRoom(req.params.roomId).then(
		()=>{
			res.status(201).json({
				message:'Temperature record successfully deleted'
			})
		}
	)
} catch (error) {
	errorHandler(error)
}
}

//=========================================================================================================================================================================================================================================
// request to device

module.exports.getTemperature =  (deviceId) => {
	//for full programm
	//const deviceUrl = 'http://' + req.body.homeIp + '/device';

	//for tests
	const deviceUrl = `http://localhost:5000/device/${deviceId}/getTemperature`;

	// Object with parametres
	const data = {
		test:'test data' 
	};
	

	const intervalInMilliseconds = 1000 * 60 *10; //10m

	setInterval(() => {

		console.log("Command send to device..." );
	  
	  // Send request on device
	 axios.get(deviceUrl,data)
	.then(response => {
		console.log('The command was successfully sent to the device.');
		console.log('Answer...');
		console.log(response.data);
		temperature.findOneByRoom(deviceId).then(
			temp=>{
				if (temp===null) {
					temperature.create(response.data)
				}else{
					temperature.updateByRoom(response.data.roomId,response.data)
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
	}, intervalInMilliseconds);

	
}