// init modules
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const connectionDB = require('./connection/connectionDB')
const Passport = require('./middleware/passport')

// init contollers
const initialilazationAll = require('./controllers/initializationDB')

// init routes
const accessoryRoutes = require('./routes/accessory')
const authRoutes = require('./routes/auth')
//for simulate -----------------
const deviceRoutes = require('./simulateDevices/routes/device')
//-----------------------------
const logsRoutes = require('./routes/logs')
const typeRoutes = require('./routes/type')
const tempRoutes = require('./routes/temperature')
const roomRoutes = require('./routes/rooms')
const scenarioTempRoutes = require('./routes/scenarioTemp')
const supplyRoutes = require('./routes/sypplies')

const app = express()
//connection to DB
connectionDB.sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

//init all DB tables
initialilazationAll.initialilazationAll()

// init and usining passport module
app.use(passport.initialize())
Passport(passport)

// using dev modules
app.use(morgan('dev'))
app.use(cors())
//coding and uncoding body parser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// write path of route and meneger route file
app.use('/api/accesories', accessoryRoutes)
app.use('/api/auth', authRoutes)
// for simulate ----------------
app.use('/device', deviceRoutes)
//------------------------------
app.use('/api/logs', logsRoutes)
app.use('/api/types', typeRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/temps', tempRoutes)
app.use('/api/scenarioTemp', scenarioTempRoutes)
app.use('/api/sypplies', supplyRoutes)

// simulate device
//start check temperature by interval in automatic mode
const meterController = require('./controllers/temperature')
meterController.getTemperature(1)
meterController.getTemperature(2)
meterController.getTemperature(3)
meterController.getTemperature(5)

const deviceController = require('./controllers/device')
deviceController.getIndicators(2)
deviceController.getIndicators(3)
deviceController.getIndicators(4)
deviceController.getIndicators(5)
deviceController.getIndicators(6)
module.exports = app