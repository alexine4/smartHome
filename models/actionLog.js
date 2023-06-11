// In this file you crate and sync model table ActionLog
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
class ActionLog extends Sequelize.Model { }


module.exports.initialization = async () => {

	await ActionLog.init({
		aLogId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		houseId: {
			type: Sequelize.BIGINT,
			allowNull:false
		},
		message: {
			type: Sequelize.STRING,
			allowNull: false
		},
		checked: {
			type: Sequelize.BOOLEAN,
			default:false
		}

	}, {
		sequelize,
		modelName: 'ActionLog'
	})
	sequelize.sync({
		alter: true
	})
	return true
}
// create new record
module.exports.create = async ( message,houseId,checked) => {
	await ActionLog.create({
		houseId,
		message,
		checked
	})
		.catch(error => {
			return error
		})
}
// update record by id
module.exports.updateById = async (aLogId) => {
	await ActionLog.update({
		checked: true
	}, {
		where: { aLogId }
	})
		.catch(error => {
			return error
		})
}
// update record by house
module.exports.updateByHouse = async (houseId) => {
	await ActionLog.update({
		checked: true
	}, {
		where: { houseId }
	})
		.catch(error => {
			return error
		})
}
// select records by house, limit 25 records
module.exports.findAllByHouse = async (houseId) => {
	return await ActionLog.findAll({where:{
		houseId
	},
order:[
	['aLogId','DESC']
],
limit:25
},
	
	)
}
// count non checked records
module.exports.countNonChecked = async (houseId) => {
	
	return await ActionLog.count( {
		where: { 
			houseId,
			checked:false 
		}
	})
}
