const Hook = require('../api/models/Hook')
const fetch = require('node-fetch')

const sendHooks = (user, body, action) => {
  body.text = `${user.username} ${action} a player. ${body.name}, ${body.origin}, playes as ${body.position} for ${body.club} and has contrat to ${body.contractTo}`

  Hook.find({})
    .then(data => data.map(d =>
      fetch(d.callbackUrl, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
      })
    ))
    .then(p => Promise.all(p))
    .then(() => console.log('Done'), console.log)
}

module.exports = sendHooks
