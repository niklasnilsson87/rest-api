const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    meta: {
      title: 'Agent Database',
      license: 'MIT',
      version: '1.0',
      author: 'Niklas Nilsson',
      desc: 'Player agents can view, store, delete and update the players in their stall.',
      authenticationDesc: 'Register agent, login and recieve a token to set in Authentication header to make requests.'
    },
    links: {
      self: `http://${req.headers.host}${req.originalUrl}`
    }
  })
})

module.exports = router
