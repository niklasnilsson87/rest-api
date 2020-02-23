const router = require('express').Router()
require('dotenv').config()

const VERSION = process.env.VERSION

router.get('/', (req, res) => {
  res.json({
    meta: {
      title: 'Agent REST-Api',
      license: 'MIT',
      version: VERSION,
      author: 'Niklas Nilsson',
      desc: 'Player agents can view, store, delete and update the players in their stall.',
      authenticationDesc: 'Register agent, login and recieve a token to set in Authentication header to make requests.'
    },
    links: {
      self: {
        url: `http://${req.headers.host}${req.originalUrl}`,
        method: 'GET',
        desc: 'Api root'
      },
      agents: {
        register: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/agents/register`,
          method: 'POST',
          desc: 'Register: { username: <username>, password: <password>, email: <email> } (JSON format)'
        },
        login: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/agents/login`,
          method: 'POST',
          desc: 'Login: { username: <username>, password: <password> } (JSON format), response: Token in payload'
        },
        read: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/agents`,
          method: 'GET',
          desc: 'View all registered agents'
        },
        readSingle: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/agents/:id`,
          method: 'GET',
          desc: 'View single agent',
          access: 'Private',
          token: 'Required'
        },
        update: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/agents/:id`,
          method: 'PATCH',
          desc: 'Update: [ { propName: <property to change>, value: <newValue> } ], Add more objects in order to change muliple properties',
          access: 'Private',
          token: 'Required'
        },
        delete: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/agents/:id`,
          method: 'DELETE',
          desc: 'Delete user',
          access: 'Private',
          token: 'Required'
        }
      },
      players: {
        add: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/players`,
          method: 'POST',
          desc: 'Add: { name: <playerName>, origin: <origin>, position: <position>, club: <club>, contractTo: < ex. 2022-02-12> }',
          access: 'Private',
          token: 'Required'
        },
        read: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/players`,
          method: 'GET',
          desc: 'View all players'
        },
        readSingle: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/players/:id`,
          method: 'GET',
          desc: 'View single player',
          access: 'Private',
          token: 'Required'
        },
        update: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/players/:id`,
          method: 'PATCH',
          desc: 'Update: [ { propName: <property to change>, value: <newValue> } ], Add more objects in order to change muliple properties',
          access: 'Private',
          token: 'Required'
        },
        delete: {
          url: `http://${req.headers.host}${req.originalUrl}${VERSION}/players/:id`,
          method: 'DELETE',
          desc: 'Delete player',
          access: 'Private',
          token: 'Required'
        }
      }
    }
  })
})

module.exports = router
