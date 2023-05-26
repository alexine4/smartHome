//import modules
const express = require('express')
const passport = require('passport')
//import controllers
const controller = require('../controllers/temperature')

const router = express.Router()


router.get('/getTemps', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/getTemp/:tempId', passport.authenticate('jwt', { session: false }), controller.getByID)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:tempId', passport.authenticate('jwt', { session: false }), controller.updateByID)
/*router.delete('/delete/:roomId', passport.authenticate('jwt', { session: false }), controller.deleteByID)
 */
module.exports = router