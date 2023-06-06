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
app.use('/api/types', typeRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/temps', tempRoutes)
app.use('/api/scenarioTemp', scenarioTempRoutes)
app.use('/api/sypplies', supplyRoutes)
//app.use('/uploads', express.static('uploads')) 



module.exports = app