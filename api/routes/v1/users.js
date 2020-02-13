const router = require('express').Router()

const { register, login, read, update, single, remove } = require('../../controllers/authController')

router.get('/', read)

router.post('/login', login)

router.post('/register', register)

router.get('/:userID', single)

router.patch('/:userID', update)

router.delete('/:userID', remove)

module.exports = router
