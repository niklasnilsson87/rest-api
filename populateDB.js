const { resolve } = require('path')
const { readJson } = require('fs-extra')

const db = require('./config/mongoose')
const Player = require('./api/models/Player')
const Agent = require('./api/models/Agent')

const path = resolve('data', 'players.json')

;(async () => {
  try {
    await db.connect()
    // eslint-disable-next-line handle-callback-err
    const dataPromise = readJson(path).catch(error => [])
    data = JSON.parse(data)
    const promises = []
  } catch (error) {
    console.log(error)
  }
})()
