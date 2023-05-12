const user = require('../models/user')
const rooms = require('../models/rooms')


module.exports.initialilazationAll= ()=>{
	user.initialization()
	rooms.initialization()
}