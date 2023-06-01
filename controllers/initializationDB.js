// in this fille initialization all models

//import models
const accesories = require('../models/accesories')
const accessoryType = require('../models/accesoriesTypes')
const calculations = require('../models/calculations')
const houses = require('../models/house')
const limits = require('../models/limits')
const properties = require('../models/properties')
const rooms = require('../models/rooms')
const scenarioTemp = require('../models/scenarioTemp')
const sypplys = require('../models/supplys')
const temp = require('../models/temperature')
const types = require('../models/types')
const user = require('../models/user')
const using = require('../models/using')

// initialization
module.exports.initialilazationAll= ()=>{
	accesories.initialization()
	accessoryType.initialization()
	calculations.initialization()
	properties.initialization()
	houses.initialization()
	limits.initialization()
	rooms.initialization()
	scenarioTemp.initialization()
	sypplys.initialization()
	types.initialization()
	temp.initialization()
	user.initialization()
	using.initialization()
}