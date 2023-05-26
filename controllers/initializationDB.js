// in this fille initialization all models

//import models
const user = require('../models/user')
const rooms = require('../models/rooms')
const types = require('../models/types')
const temp = require('../models/temperature')

// initialization
module.exports.initialilazationAll= ()=>{
	user.initialization()
	rooms.initialization()
	types.initialization()
	temp.initialization()
}