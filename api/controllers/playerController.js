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
    players: players
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

    res.status(200).json({
      method: req.method,
      createdPlayer: player
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
    const player = await Player.findById(playerID)
    res.status(200).json({
      method: req.method,
      message: 'Player found',
      getPlayer: player
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
        id: playerID
      })
    } else {
      res.status(400).json({
        method: req.method,
        message: 'Did not update player',
        id: playerID
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
    const deletePlayer = await Player.remove({ _id: playerID })
    if (deletePlayer.deletedCount) {
      res.status(200).json({
        message: 'Deleted player',
        id: playerID
      })
    } else {
      res.status(404).json({
        message: 'No player to delete',
        id: playerID
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal error',
      error: error
    })
  }
}

module.exports = {
  read,
  add,
  single,
  update,
  remove
}
