const express = require('express')
const passport = require('passport')
const controller = require('../controllers/scenarioTemp')

const router = express.Router()


router.get('/getScenarios/:roomId', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/getScenario/:scenarioId', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:roomId', passport.authenticate('jwt', { session: false }), controller.updateByRoom)
router.delete('/delete/:roomId', passport.authenticate('jwt', { session: false }), controller.deleteById)



module.exports = router