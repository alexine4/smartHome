// In this file you crate and sync model table Sypplys
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
class Sypplys extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Sypplys.init({
		sypplyId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		houseId: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		sypplyName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		sypplyType: {
			type: Sequelize.STRING,
			allowNull: false
		},
		status: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		},
		tarif: {
			type: Sequelize.FLOAT,
			allowNull: true
		},
		sypplyAccount: {
			type: Sequelize.INTEGER,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'Sypplys'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

module.exports.create = async(houseId,{sypplyName,sypplyType,status,tarif,sypplyAccount})=>{
await Sypplys.create({
	houseId,
	sypplyName,
	sypplyType,
	status,
	tarif,
	sypplyAccount
})
.catch(error => {
	return error
})
}

module.exports.findByName = async(houseId,{sypplyName})=>{
return await Sypplys.findOne(
	{
		where:{
			houseId,
			sypplyName
		}
	}
)
}
module.exports.findAll = async(houseId)=>{
return await Sypplys.findAll(
	{
		where:{
			houseId
		}
	}
)
}