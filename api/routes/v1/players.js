const router = require('express').Router()
const { verifyToken, verifyAgent } = require('../../../middlewares/verify')

const {
  read,
  add,
  single,
  update,
  remove
} = require('../../controllers/playerController')

router.get('/', verifyToken, read)

router.post('/', verifyToken, add)

router.get('/:playerID', verifyToken, verifyAgent, single)

router.patch('/:playerID', verifyToken, verifyAgent, update)

router.delete('/:playerID', verifyToken, verifyAgent, remove)

module.exports = router
