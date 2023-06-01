// In this file you crate and sync model table Using
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
class Using extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Using.init({
		usingId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		amount: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Using'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async({amount})=>{
await Using.create({
	amount
})
.catch(error => {
	return error
})
}