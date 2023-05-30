// in this fille initialization all models

//import models
const houses = require('../models/house')
const rooms = require('../models/rooms')
const scenarioTemp = require('../models/scenarioTemp')
const temp = require('../models/temperature')
const types = require('../models/types')
const user = require('../models/user')

// initialization
module.exports.initialilazationAll= ()=>{
	houses.initialization()
	rooms.initialization()
	scenarioTemp.initialization()
	types.initialization()
	temp.initialization()
	user.initialization()
}