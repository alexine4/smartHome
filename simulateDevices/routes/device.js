const express = require('express')
const meterController = require('../controllers/meters')
const tempController = require('../controllers/tempDevice')


const router = express.Router()

router.get('/:deviceId/getTemperature',tempController.getTemperature)
router.get('/getIndicators/:meterId',meterController.getIndicators)
/* router.post('/login',controller.login)
router.post('/register',controller.register)
router.post('/confirmConnection',controller.confirmConnectionReq)
router.post('/connectionCode',controller.confirmConnectionRes)
router.post('/checkUser',controller.checkUser)
router.post('/changePassword',controller.changePassword)

router.post('/device',controller.test) */

module.exports = router