//import modules
const express = require('express')
const passport = require('passport')
//import controllers
const controller = require('../controllers/sypplies')

const router = express.Router()


router.get('/getAll', passport.authenticate('jwt', { session: false }), controller.getAll)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:sypplyId', passport.authenticate('jwt', { session: false }), controller.updateById)
router.delete('/delete/:sypplyId', passport.authenticate('jwt', { session: false }), controller.deleteById)

module.exports = router