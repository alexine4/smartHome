// In this file you crate and sync model table Types
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
class Types extends Sequelize.Model {}


module.exports.initialization = async () => {

	await Types.init({
		typeId: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		typeName: {
			type: Sequelize.STRING,
			allowNull: false
		}

	}, {
		sequelize,
		modelName: 'Types'
	})
	sequelize.sync({
		alter: true
	})
	return true
}
module.exports.create = async (typeName) => {
	await Types.create({
			typeName
		})
		.catch(error => {
			return error
		})
}
module.exports.update = async (typeId, typeName) => {
	await Types.update({
			typeName
		}, {
			where: {
				typeId
			}
		})
		.catch(error => {
			return error
		})
}
module.exports.delete = async (typeName) => {
	await Types.destroy({
			where: {
				typeName
			}
		})
		.catch(error => {
			return error
		})
}
module.exports.findOneById = async (typeId) => {
	try {
		return await Types.findOne({
			where: {
				typeId
			}
		})
	} catch (error) {
		return error
	}
}
module.exports.findOneByName = async (typeName) => {
	try {
		return await Types.findOne({
			where: {
				typeName
			}
		})
	} catch (error) {
		return error
	}
}
module.exports.findAll = async () => {
	try {
		return await Types.findAll()
	} catch (error) {
		return error
	}
}