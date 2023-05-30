// In this file you crate and sync model table Houses
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
class Houses extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Houses.init({
		houseId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		houseIp: {
			type: Sequelize.STRING,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'Houses'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async(houseIp)=>{
await Houses.create({houseIp})
.catch(error => {
	return error
})
}

module.exports.findByIp = async(houseIp)=>{
return await Houses.findOne({where:{houseIp}})
}