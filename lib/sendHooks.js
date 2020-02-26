const Hook = require('../api/models/Hook')
const fetch = require('node-fetch')

const sendHooks = (user, body, action) => {
  console.log('Sending hooks')
  body.text = `${user.username} ${action} a player. ${body.name}, ${body.origin}, playes as ${body.position} for ${body.club} and has contrat to ${body.contractTo}`
  console.log(body.text)
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

const PlayersArr =
[
  {
    name: 'Alphonso Davies',
    origin: 'Canada',
    position: 'Left-Back',
    club: 'Bayern Munich',
    contractTo: '30.06.2023'
  },
  {
    name: 'Christian Eriksen',
    origin: 'Denmark',
    position: 'Attacking Midfield',
    club: 'Inter',
    contractTo: '30.06.2024'
  },
  {
    name: 'Bruno Fernandes',
    origin: 'Portugal',
    position: 'Attacking Midfield',
    club: 'Manchester United',
    contractTo: '30.06.2025'
  },
  {
    name: 'Erling Haaland',
    origin: 'Norway',
    position: 'Centre-Forward',
    club: 'Borussia Dortmund',
    contractTo: '30.06.2024'
  },
  {
    name: 'Neymar',
    origin: 'Brazil',
    position: 'Left-Winger',
    club: 'Paris Saint-Germain',
    contractTo: '30.06.2022'
  },
  {
    name: 'Antoine Griezmann',
    origin: 'France',
    position: 'Left-Winger',
    club: 'FC Barcelona',
    contractTo: '30.06.2024'
  },
  {
    name: 'Alexander Isak',
    origin: 'Sweden',
    position: 'Centre-Forward',
    club: 'Real Sociedad',
    contractTo: '30.06.2024'
  },
  {
    name: 'Robin Quaison',
    origin: 'Sweden',
    position: 'Centre-Forward',
    club: '1.FSV Mainz 05',
    contractTo: '30.06.2021'
  }
]
