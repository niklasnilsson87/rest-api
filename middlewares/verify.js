const jwt = require('jsonwebtoken')
const Player = require('../api/models/Player')
const Hook = require('../api/models/Hook')
require('dotenv').config()

const Response = require('../api/responses/Response')

/**
 * Middleware that checks and verify that its the
 * right token that is passed in the header.
 *
 * @param {Object} req
 * @param {Object} res
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
 * @param {Object} req
 * @param {Object} res
 * @param {Next} next
 */
const verifyUser = (req, res, next) => {
  const { agentID } = req.params
  const { user } = req

  if (agentID === user.id) {
    next()
  } else {
    return Response._401(res, req, 'Authorazation denied')
  }
}

/**
 * Middleware that checks and verify that its the
 * agent that has access to update and delete players.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Next} next
 */
const verifyAgent = async (req, res, next) => {
  const { playerID } = req.params
  const { user } = req

  const player = await Player.findById(playerID)

  if (user.username === player.agent) {
    next()
  } else {
    return Response._401(res, req, 'Authorazation denied')
  }
}

/**
 * Middleware that checks and verify that its the
 * agent that has access to update and delete hooks.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Next} next
 */
const verifyHook = async (req, res, next) => {
  const { hookID } = req.params
  const { user } = req

  const hook = await Hook.findById(hookID)

  if (user.username === hook.agent) {
    next()
  } else {
    return Response._401(res, req, 'Authorazation denied')
  }
}

module.exports = {
  verifyToken,
  verifyUser,
  verifyAgent,
  verifyHook
}
