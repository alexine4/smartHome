const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const connectionDB = require('./connection/connectionDB')
const Passport = require('./middleware/passport')


const initialilazationAll = require('./controllers/initializationDB')

const authRoutes = require('./routes/auth')

const app = express()



connectionDB.sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

initialilazationAll.initialilazationAll()

app.use(passport.initialize())
Passport(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth',authRoutes)
//app.use('/uploads', express.static('uploads')) 



module.exports = app