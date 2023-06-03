// In this file you crate and sync model table Calculations
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
class Calculations extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Calculations.init({
		sypplyId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: false
		},
		amount: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		cost: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Calculations'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async({sypplyId,amount,cost})=>{
await Calculations.create({
	sypplyId,
	amount,
	cost
})
.catch(error => {
	return error
})
}