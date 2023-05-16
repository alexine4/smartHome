const express = require('express')
const passport = require('passport')
const controller = require('../controllers/rooms')

const router = express.Router()


router.get('/getRooms', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/getRoom/:roomId', passport.authenticate('jwt', { session: false }), controller.getByID)
router.post('/addNew', passport.authenticate('jwt', { session: false }), controller.addNew)
router.patch('/update/:roomId', passport.authenticate('jwt', { session: false }), controller.updateByID)
router.delete('/delete/:roomId', passport.authenticate('jwt', { session: false }), controller.deleteByID)



module.exports = router