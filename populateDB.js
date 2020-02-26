const { resolve } = require('path')
const { readJson } = require('fs-extra')
require('dotenv').config()

const mongoose = require('./config/mongoose')
const Player = require('./api/models/Player')
const Agent = require('./api/models/Agent')

const playerPath = resolve('data', 'players.json')
const agentPath = resolve('data', 'agents.json')

;(async () => {
  try {
    await mongoose.connect()
    // eslint-disable-next-line handle-callback-err
    const playerPromise = readJson(playerPath).catch(error => [])
    // eslint-disable-next-line handle-callback-err
    const agentPromise = readJson(agentPath).catch(error => [])

    const [players, agents] = await Promise.all([playerPromise, agentPromise])

    const promises = []
    players.map(player => {
      const newPlayer = new Player(player)
      promises.push(newPlayer.save())
    })
    agents.map(agent => {
      const newPlayer = new Agent(agent)
      promises.push(newPlayer.save())
    })
    await Promise.all(promises)
    console.log('Done!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
