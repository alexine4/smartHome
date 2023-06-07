
module.exports.getIndicators = async (req, res) => {
	try {
		console.log('--------------------------------------------------------');
		console.log('Good practice on the device');
		console.log('--------------------------------------------------------');
		const minNumber = 1;
		const maxNumber = 50;
		const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;;
		res.status(200).json({
			sypplyId:`${req.params.meterId}`,
			amount: `${randomNumber}` 
			})
	} catch (error) {
		res.status(400).json(error)
	}
}