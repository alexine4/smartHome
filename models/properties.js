// In this file you crate and sync model table Properties
const Sequelize = require('sequelize')

// connect to database
const connectDB = require('../connection/connectionDB')
const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB, {
		dialect: connectDB.typeDB,
	}
)
class Properties extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Properties.init({
		propertyId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		},
		brightnessLevel: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		volume: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		ventilationRate: {
			type: Sequelize.INTEGER,
			allowNull: true
		}

	}, {
		sequelize,
		modelName: 'Properties'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async({status,brightnessLevel,volume,ventilationRate})=>{
await Properties.create({
	status,
	brightnessLevel,
	volume,
	ventilationRate
})
.catch(error => {
	return error
})
}