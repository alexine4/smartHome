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
class Properties extends Sequelize.Model { }


module.exports.initialization = async () => {

	await Properties.init({
		accessoryId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: false
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
// create new record
module.exports.create = async ({ status, brightnessLevel, volume, ventilationRate }) => {
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
// update record by id
module.exports.update = async ({ accessoryId, status, brightnessLevel, volume, ventilationRate }) => {
	await Properties.update({
		status,
		brightnessLevel,
		volume,
		ventilationRate
	},{
		where:{
			accessoryId
		}
	})
		.catch(error => {
			return error
		})
}

// delete record by accessory
module.exports.deleteByAccessory = async (accessoryId) => {
	await Properties.destroy({ where: { accessoryId } })
		.catch(error => {
			return error
		})
}

//find one by accessory
module.exports.findByAccessory = async (accessoryId) => {
	return await Properties.findOne({ where: { accessoryId } })
}
