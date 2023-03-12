const Sequelize = require('sequelize')

const nameDB = 'SmartHouse'
exports.nameDB = nameDB

const loginDB = 'test'
exports.loginDB = loginDB

const passwordDB = '01010203'
exports.passwordDB = passwordDB

const typeDB = 'mysql'
exports.typeDB = typeDB

	const sequelize = new Sequelize(
		nameDB,
		loginDB,
		passwordDB,
		{	
			host: '127.0.0.1', // default localhost
			port: 3306,
			dialect: typeDB
		}
		
	)
	
exports.sequelize = sequelize

const jwt = 'jwt-key'
exports.jwt = jwt