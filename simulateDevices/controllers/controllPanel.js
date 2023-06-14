

// get indicators by sypplies 
module.exports.getIndicators = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		const minNumber = 1;
		const maxNumber = 50;
		const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;;
		res.status(200).json({
			sypplyId: `${req.params.meterId}`,
			amount: `${randomNumber}`
		})
	} catch (error) {
		res.status(400).json(error)
	}
}
// get temperature in room 
module.exports.getTemperature = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		const minNumber = 18.1;
		const maxNumber = 25.9;
		const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;;
		res.status(200).json({
			roomId: `${req.params.deviceId}`,
			actualTemp: `${randomNumber}`
		})
	} catch (error) {
		res.status(400).json(error)
	}
}

// save scenario array
let scenario = [
	{
		scenarioId: 1,
		roomId: 2,
		name: 'Morning',
		minTemp: 19.4,
		maxTemp: 22,
		timeStart: '06:00:00',
		timeStop: '09:30:00',
		active: false
	},
	{
		scenarioId: 2,
		roomId: 2,
		name: 'Dady',
		minTemp: 18.3,
		maxTemp: 19.7,
		timeStart: '09:30:00',
		timeStop: '13:15:00',
		active: false
	},
	{
		scenarioId: 3,
		roomId: 2,
		name: 'Mary play',
		minTemp: 17.5,
		maxTemp: 20,
		timeStart: '13:15:00',
		timeStop: '18:15:00',
		active: false
	}
]

// get scenario by room
module.exports.getScenarioTemp = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		console.log('Geting temperature scenario...');
		console.log('--------------------------------------------------------');
		let arr = []
		for (let index = 0; index < scenario.length; index++) {
			if (scenario[index].roomId.toString() === req.params.deviceId) {
				arr.push(scenario[index])
			}

		}
		res.status(200).json(arr)
	} catch (error) {
		res.status(400).json(error)
	}
}
//  update scenario by room and id
module.exports.updateScenarioTemp = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		console.log('Updating temperature scenario...');
		console.log('--------------------------------------------------------');

		for (let index = 0; index < scenario.length; index++) {
			if (scenario[index].roomId.toString() === req.params.deviceId &&
				scenario[index].scenarioId.toString() === req.params.scenarioId) {
				scenario[index] = req.body;
			}
		}
		res.status(200).json({ message: `Temperature scenario ${req.body.name} successfully updated`,status:true })
	} catch (error) {
		res.status(400).json(error)
	}
}
//  create scenario by room and id
module.exports.addNewScenarioTemp = async (req, res) => {
	console.log('sdfd');
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		console.log('Creating temperature scenario...');
		console.log('--------------------------------------------------------');
		req.body.roomId = req.params.deviceId

		scenario.push(req.body)
		res.status(200).json({ message: `Temperature scenario ${req.body.name} successfully created`,status:true })


	} catch (error) {
		res.status(400).json(error)
	}
}
// delete scenario by room and id
module.exports.deleteScenarioTemp = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		console.log('Deleting temperature scenario...');
		console.log('--------------------------------------------------------');
		req.body.roomId = req.params.deviceId

		scenario = scenario.filter(obj => obj.roomId.toString() !== req.params.roomId &&obj.scenarioId.toString() !== req.params.scenarioId )
		
		res.status(200).json({ message: `Temperature scenario  successfully deleted`,status:true })


	} catch (error) {
		res.status(400).json(error)
	}
}
const properties = [
	{
		accessoryId: 1,
		status: true,
		brightnessLevel: 2,
		volume:null,
		ventilationRate:null
	},
	{
		accessoryId: 2,
		status: false,
		brightnessLevel: null,
		volume:1,
		ventilationRate:null
	},
	{
		accessoryId: 3,
		status: true,
		brightnessLevel: null,
		volume:null,
		ventilationRate:5
	}
]
// get device properties
module.exports.getProperties = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		console.log('Getting properties...');
		console.log('--------------------------------------------------------');
		for (let index = 0; index < properties.length; index++) {
			if (properties[index].accessoryId.toString() ===req.params.deviceId) {
				res.status(200).json(properties[index])
			}
		}
		res.status(200).json(null)
	} catch (error) {
		res.status(400).json(error)
	}
}
// update device properties
module.exports.updateProperties = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		console.log('Update properties...');
		console.log('--------------------------------------------------------');
		
		for (let index = 0; index < properties.length; index++) {
			if (properties[index].accessoryId.toString() ===req.params.deviceId) {
				req.body.accessoryId = req.params.deviceId
				properties[index] = req.body
				res.status(200).json({message:`Properties ${req.body.accessoryId} successfully updated` })
			}
			
		}
		properties.push(req.body)
				res.status(200).json({message:`Properties ${req.body.accessoryId} successfully updated` })
		
	} catch (error) {
		res.status(400).json(error)
	}
}
