//import modules
const express = require('express')
const passport = require('passport')
//import controllers
const controller = require('../controllers/sypplies')

const router = express.Router()


router.get('/getAll', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/getOne/:sypplyId', passport.authenticate('jwt', { session: false }), controller.getByID)
router.get('/getLimit/:sypplyId', passport.authenticate('jwt', { session: false }), controller.getLimit)
router.get('/getUsing/:sypplyId', passport.authenticate('jwt', { session: false }), controller.getUsing)
router.get('/getCalc/:sypplyId', passport.authenticate('jwt', { session: false }), controller.getCalc)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.post('/addNewCalc', passport.authenticate('jwt', { session: false }), controller.addNewCalc)
router.post('/addNewLimit/:sypplyId', passport.authenticate('jwt', { session: false }), controller.addNewLimit)
router.patch('/update/:sypplyId', passport.authenticate('jwt', { session: false }), controller.updateById)
router.delete('/delete/:sypplyId', passport.authenticate('jwt', { session: false }), controller.deleteById)

module.exports = router