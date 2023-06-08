// In this file you crate and sync model table Calculations
const Sequelize = require('sequelize')
const {Op} = Sequelize;

// connect to database
const connectDB = require('../connection/connectionDB')
const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB, {
	dialect: connectDB.typeDB,
}
)
class Calculations extends Sequelize.Model { }


module.exports.initialization = async () => {

	await Calculations.init({
		
		calcId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		sypplyId: {
			type: Sequelize.BIGINT,
			allowNull:false
		},
		amount: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		cost: {
			type: Sequelize.FLOAT,
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

module.exports.create = async ({ sypplyId, amount, cost }) => {
	await Calculations.create({
		sypplyId,
		amount,
		cost
	})
		.catch(error => {
			return error
		})
}

module.exports.getAllBySypply = async (sypplyId) => {
	return await Calculations.findAll({ where: { sypplyId } })
}
module.exports.getBySypplyAtPeriod = async (sypplyId,currentDate,previousDate) => {
	return await Calculations.findAll({
		where: {
			sypplyId,
			createdAt: {
				[Op.lt]: currentDate,
				[Op.gte]: previousDate
			}
		}
	})
}