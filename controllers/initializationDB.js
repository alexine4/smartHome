const user = require('../models/user')
const rooms = require('../models/rooms')
const types = require('../models/types')


module.exports.initialilazationAll= ()=>{
	user.initialization()
	rooms.initialization()
	types.initialization()
}