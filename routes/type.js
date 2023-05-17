const express = require('express')
const passport = require('passport')
const controller = require('../controllers/types')

const router = express.Router()


router.get('/getTypes', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/getType/:typeId', passport.authenticate('jwt', { session: false }), controller.getByID)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:typeName', passport.authenticate('jwt', { session: false }), controller.updateByName)
router.delete('/delete/:typeName', passport.authenticate('jwt', { session: false }), controller.deleteByName)



module.exports = router