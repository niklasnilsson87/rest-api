const router = require('express').Router()

const {
  read,
  add,
  single,
  update,
  remove
} = require('../../controllers/playerController')

router.get('/', read)

router.post('/add', add)

router.get('/:playerID', single)

router.patch('/:playerID', update)

router.delete('/:playerID', remove)

module.exports = router
