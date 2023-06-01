// In this file you crate and sync model table Limits
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
class Limits extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Limits.init({
		limitId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		perDay: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		perMonth: {
			type: Sequelize.INTEGER,
			allowNull: true
		},

	}, {
		sequelize,
		modelName: 'Limits'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async({perDay,perMonth})=>{
await Limits.create({
	perDay,
	perMonth
})
.catch(error => {
	return error
})
}