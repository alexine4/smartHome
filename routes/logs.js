const express = require('express')
const passport = require('passport')
const controller = require('../controllers/log')

const router = express.Router()


router.get('/getActive', passport.authenticate('jwt', { session: false }), controller.getActive)
router.get('/getAll', passport.authenticate('jwt', { session: false }), controller.getAllByHouse)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:aLogId', passport.authenticate('jwt', { session: false }), controller.updateById)
router.patch('/updateAll', passport.authenticate('jwt', { session: false }), controller.updateByHouse)




module.exports = router