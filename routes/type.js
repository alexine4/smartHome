const express = require('express')
const passport = require('passport')
const controller = require('../controllers/types')

const router = express.Router()


router.get('/getTypes', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/getType/:typeId', passport.authenticate('jwt', { session: false }), controller.getByID)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:typeId', passport.authenticate('jwt', { session: false }), controller.updateByID)
router.delete('/delete/:typeId', passport.authenticate('jwt', { session: false }), controller.deleteByID)



module.exports = router