const Player = require('../models/Player')
const Response = require('../responses/Response')
const sendHooks = require('../../lib/sendHooks')

/**
 *
 * @route GET api/v1/players
 * @description Get all players
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const read = async (req, res) => {
  const players = await Player.find()
    .select('-__v')
    .select('-createdAt')
    .select('-updatedAt')
    .sort('name')

  if (players >= 0) return Response._404(res, req, 'No players stored')

  Response._200(res, req, players)
}

/**
 *
 * @route POST api/v1/players/add
 * @description Create new player
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const add = async (req, res) => {
  const { body, user } = req
  const { name, origin, position } = body

  if (!name || !origin || !position) {
    return Response._400(res, req, 'Invalid request payload')
  }

  const isPlayer = await Player.findOne({ name })
  if (isPlayer) return Response._409(res, req, 'Player already exist')

  try {
    const newPlayer = new Player({
      agent: user.username,
      name: body.name,
      origin: body.origin,
      position: body.position,
      club: body.club,
      contractTo: body.contractTo
    })
    const player = await newPlayer.save()

    sendHooks(user, body, 'added')

    Response._201(res, req, 'Player created Successfully', player)
  } catch (error) {
    console.log(error)
    Response._500(res, req, `Unsuccessful Registration: ${error}`)
  }
}

/**
 *
 * @route GET api/v1/players/:playerID
 * @description Get one player
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const single = async (req, res) => {
  const { playerID } = req.params

  try {
    const player = await Player.findById(playerID).select('-__v')
    Response._200(res, req, player)
  } catch (error) {
    Response._404(res, req, 'No players found')
  }
}

/**
 *
 * @route PATCH api/v1/players/:playerID
 * @description Update one player
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const update = async (req, res) => {
  const { playerID } = req.params

  if (Array.isArray(req.body)) {
    const updated = {}

    for (const ops of req.body) {
      if (ops.propName === '_id') {
        return Response._403(res, req, 'Not allowed')
      }
      updated[ops.propName] = ops.value
    }

    try {
      const update = await Player.updateOne(
        { _id: playerID },
        { $set: updated }
      )

      if (update.nModified) {
        Response._200(res, req, playerID)
      } else {
        Response._400(res, req, 'Failed to update player')
      }
    } catch (error) {
      Response._404(res, req, 'No player to update')
    }
  } else {
    Response._400(res, req, 'Wrong JSON format')
  }
}

/**
 *
 * @route Delete api/v1/players/:playerID
 * @description Delete one player
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const remove = async (req, res) => {
  const { playerID } = req.params

  try {
    const deletePlayer = await Player.deleteOne({ _id: playerID })
    if (deletePlayer.deletedCount) {
      Response._200(res, req, playerID)
    } else {
      Response._404(res, req, 'No player to delete')
    }
  } catch (error) {
    Response._500(res, req, `Unsuccessful delete: ${error}`)
  }
}

module.exports = {
  read,
  add,
  single,
  update,
  remove
}
