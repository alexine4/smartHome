// In this file server connected to database
const Sequelize = require('sequelize')

// Database name
const nameDB = 'SmartHouse'
exports.nameDB = nameDB
// Database user login
const loginDB = 'test'
exports.loginDB = loginDB
// Database user password
const passwordDB = '01010203'
exports.passwordDB = passwordDB
// Database type
const typeDB = 'mysql'
exports.typeDB = typeDB

//Function connection to database
	const sequelize = new Sequelize(
		nameDB,
		loginDB,
		passwordDB,
		{	
			host: '127.0.0.1', // default localhost or 127.0.0.1
			port: 3306,
			dialect: typeDB
		}
		
	)
	
exports.sequelize = sequelize
// Create jwt key
const jwt = 'jwt-key'
exports.jwt = jwt