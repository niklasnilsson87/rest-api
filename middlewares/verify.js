const jwt = require('jsonwebtoken')
const Player = require('../api/models/Player')
require('dotenv').config()

const Response = require('../api/responses/Response')

/**
 * Middleware that checks and verify that its the
 * right token that is passed in the header.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) return Response._401(res, req, 'No token, authorazation denied')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded
    next()
  } catch (e) {
    Response._400(res, req, 'token is not valid')
  }
}

/**
 * Middleware that checks and verify that its the
 * agent that has access to modify.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const verifyUser = (req, res, next) => {
  const { userID } = req.params
  const { user } = req

  if (userID === user.id) {
    next()
  } else {
    Response._401(res, req, 'Authorazation denied')
  }
}

/**
 * Middleware that checks and verify that its the
 * agent that has access to update and delete players.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const verifyAgent = async (req, res, next) => {
  const { playerID } = req.params
  const { user } = req

  const player = await Player.findById(playerID)

  if (user === player.agent) {
    next()
  } else {
    Response._401(res, req, 'Authorazation denied')
  }
}

module.exports = {
  verifyToken,
  verifyUser,
  verifyAgent
}
