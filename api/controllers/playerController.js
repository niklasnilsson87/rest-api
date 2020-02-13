const Player = require('../models/Player')
/**
 *
 * @route GET api/v1/players
 * @description Get all players
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const read = async (req, res) => {
  const players = await Player.find().select('-__v').sort('name')
  if (players >= 0) return res.status(404).json({ message: 'No players stored' })

  res.status(200).json({
    method: req.method,
    count: players.length,
    players: players.map(player => ({
      name: player.name,
      origin: player.origin,
      club: player.club,
      position: player.position,
      contractTo: player.contractTo,
      links: linksObject(req, player)
    })
    )
  })
}

/**
 *
 * @route POST api/v1/players/add
 * @description Create new player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const add = async (req, res) => {
  const { body } = req

  try {
    const newPlayer = new Player(body)
    const player = await newPlayer.save()

    res.status(201).json({
      method: req.method,
      message: 'Player created successfully',
      createdPlayer: player,
      links: linksObject(req, player)
    })
  } catch (error) {
    res.status(500).json({
      message: 'Unsuccessful Registration for player',
      error: error
    })
  }
}

/**
 *
 * @route GET api/v1/players/:playerID
 * @description Get one player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const single = async (req, res) => {
  const { playerID } = req.params
  try {
    const player = await Player.findById(playerID).select('-__v')
    res.status(200).json({
      method: req.method,
      message: 'Player found',
      getPlayer: player,
      links: linksObject(req, playerID)
    })
  } catch (error) {
    res.status(404).json({
      method: req.method,
      message: 'No players Found'
    })
  }
}

/**
 *
 * @route PATCH api/v1/players/:playerID
 * @description Update one player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const update = async (req, res) => {
  const { playerID } = req.params
  const updated = {}

  for (const ops of req.body) {
    updated[ops.propName] = ops.value
  }

  try {
    const update = await Player.update({ _id: playerID }, { $set: updated })
    if (update.nModified) {
      res.status(200).json({
        method: req.method,
        message: 'Updated player',
        id: playerID,
        links: linksObject(req, playerID)
      })
    } else {
      res.status(400).json({
        method: req.method,
        message: 'Fail to update player',
        id: playerID,
        links: linksObject(req, playerID)
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error
    })
  }
}

/**
 *
 * @route Delete api/v1/players/:playerID
 * @description Delete one player
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const remove = async (req, res) => {
  const { playerID } = req.params

  try {
    const deletePlayer = await Player.deleteOne({ _id: playerID })
    if (deletePlayer.deletedCount) {
      res.status(200).json({
        message: 'Deleted player',
        id: playerID,
        links: linksObject(req, playerID)
      })
    } else {
      res.status(404).json({
        message: 'No player to delete',
        id: playerID,
        links: linksObject(req, playerID)
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal error',
      error: error
    })
  }
}

const linksObject = (req, data) => ({
  self: req.headers.host + req.baseUrl + typeof data === 'number' ? '/' + data : '',
  view_all: {
    url: req.headers.host + req.baseUrl,
    method: 'GET'
  },
  view: {
    url: req.headers.host + req.baseUrl + '/' + (isNaN(data) ? data._id : data),
    method: 'GET'
  },
  add: {
    url: req.headers.host + req.baseUrl,
    method: 'POST'
  },
  delete: {
    url: req.headers.host + req.baseUrl + '/' + data._id,
    method: 'DELETE'
  },
  update: {
    url: req.headers.host + req.baseUrl + '/' + data._id,
    method: 'PATCH'
  }
})

module.exports = {
  read,
  add,
  single,
  update,
  remove
}
