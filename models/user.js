// In this file you crate and sync model table User
const Sequelize = require('sequelize')

// connect to database
const connectDB = require('../connection/connectionDB')
const sequelize = new Sequelize(
	connectDB.nameDB,
	connectDB.loginDB,
	connectDB.passwordDB, 
	{
		dialect: connectDB.typeDB,
	}
)
class User extends Sequelize.Model {}


module.exports.initialization = async () => {

	await User.init({
		userId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		homeIp: {
			type: Sequelize.STRING,
			defaultValue: false,
			allowNull: false
		},
		superUserStatus: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
	}, {
		sequelize,
		modelName: 'Users'
	})
	sequelize.sync({
		alter: true
	})
	return true
}

// function create new item in Users
module.exports.create = async (userName, email, password, homeIp) => {
	await User.create({
		userName: userName,
		email: email,
		password: password,
		homeIp
	})

}
// function find one item in Users and return
module.exports.findOne = async function (colomnName, colomnValue) {
	// find by userName
	if (colomnName === 'userName') {
		return await User.findOne({
			where: {
				userName: colomnValue
			}
		})
	}
	// find by email
	else if (colomnName === 'email') {
		return await User.findOne({
			where: {
				email: colomnValue
			}
		})
	}
	// if incorrect colomn	
	else {
		console.log('Incorrect colomn name');
	}
}
// function find one item in User by id
module.exports.findByIds = async function (userId) {
	return await User.findOne({
		where: {
			userId
		}
	})
}
// function update User by id
module.exports.update = async (userId, userName, email) => {
	await User.update({
		userName: userName,
		email: email
	}, {
		where: {
			userId
		}
	})
}
// function update password User by id
module.exports.updatePassword = async (userId, password) => {
	await User.update({
		password
	}, {
		where: {
			userId
		}
	})
}