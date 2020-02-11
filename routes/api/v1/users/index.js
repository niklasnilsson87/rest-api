const router = require('express').Router()

const { register, login, read } = require('../../../../controllers/authController')

router.post('/register', register)

router.post('/login', login)

router.get('/', read)

module.exports = router
