// In this file you crate and sync model table Using
const Sequelize = require('sequelize')
const { Op } = Sequelize;
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
			primaryKey:true,
			autoIncrement: true
		},
		sypplyId: {
			type: Sequelize.BIGINT,
			allowNull:false,
			autoIncrement: false
		},
		amount: {
			type: Sequelize.FLOAT,
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

module.exports.create = async({sypplyId,amount})=>{
await Using.create({
	sypplyId,
	amount
})
.catch(error => {
	return error
})
}
module.exports.update = async({sypplyId,amount})=>{
await Using.update({
	amount
},
{
	where:{
		sypplyId
	}
})
.catch(error => {
	return error
})
}

module.exports.findOne = async(sypplyId,createdAt)=>{
return await Using.findOne({where:{sypplyId,createdAt}})
}
module.exports.findAllBySypply = async(sypplyId,currentDate,previousDate )=>{
	return await Using.findAll({
		where:{
			sypplyId,
			createdAt: {
				[Op.lt]: currentDate, 
				[Op.gte]: previousDate
			 }
		}
	})
	}
	