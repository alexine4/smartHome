
module.exports.getTemperature = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		const minNumber = 10;
		const maxNumber = 25;
		const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;;
		res.status(200).json({
			roomId: `${req.params.deviceId}`,
			actualTemp: `${randomNumber}` 
			})
	} catch (error) {
		res.status(400).json(error)
	}
}