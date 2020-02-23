const router = require('express').Router()
const { verifyToken, verifyUser } = require('../../../middlewares/verify')

const { register, login, read, update, single, remove } = require('../../controllers/authController')

router.get('/', read)

router.post('/login', login)

router.post('/register', register)

router.get('/:agentID', verifyToken, single)

router.patch('/:agentID', verifyToken, verifyUser, update)

router.delete('/:agentID', verifyToken, verifyUser, remove)

module.exports = router
