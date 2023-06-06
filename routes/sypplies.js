//import modules
const express = require('express')
const passport = require('passport')
//import controllers
const controller = require('../controllers/sypplies')

const router = express.Router()


router.get('/getAll', passport.authenticate('jwt', { session: false }), controller.getAll)
//router.get('/getTemp/:roomId', passport.authenticate('jwt', { session: false }), controller.getByRoom)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
//router.patch('/update/:roomId', passport.authenticate('jwt', { session: false }), controller.updateByRoom)
//router.delete('/delete/:roomId', passport.authenticate('jwt', { session: false }), controller.deleteByRoom)
//
module.exports = router