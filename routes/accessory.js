const express = require('express')
const passport = require('passport')
const controller = require('../controllers/accesories')

const router = express.Router()



router.get('/:roomId', passport.authenticate('jwt', { session: false }), controller.getByRoom)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:accessoryId', passport.authenticate('jwt', { session: false }), controller.updateByID)
router.delete('/delete/:accessoryId', passport.authenticate('jwt', { session: false }), controller.deleteByID)


module.exports = router