const express = require('express')
const controller = require('../controllers/controllPanel')



const router = express.Router()

router.get('/:deviceId/getTemperature',controller.getTemperature)
router.get('/getIndicators/:meterId',controller.getIndicators)
router.get('/:deviceId/getScenarioTemp',controller.getScenarioTemp)
router.patch('/:deviceId/ScenarioTemp/:scenarioId',controller.updateScenarioTemp)
router.post('/:deviceId/ScenarioTemp/addNew',controller.addNewScenarioTemp)
router.delete('/:deviceId/deleteScenarioTemp/:scenarioId',controller.deleteScenarioTemp)
router.get('/:deviceId/getProperties',controller.getProperties)
router.patch('/:deviceId/Properties',controller.updateProperties)


module.exports = router