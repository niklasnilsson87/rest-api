const router = require('express').Router()
const { verifyToken, verifyHook } = require('../../../middlewares/verify')

const { read, add, remove } = require('../../controllers/hookController')

router.get('/', read)

router.post('/', verifyToken, add)

router.delete('/:hookID', verifyToken, verifyHook, remove)

module.exports = router
