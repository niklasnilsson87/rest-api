const Agent = require('../models/Agent')
const Player = require('../models/Player')
const { sign } = require('../../lib/jwt')
const Response = require('../responses/Response')

/**
 *
 * @route GET api/v1/agents
 * @description Get all registered agents
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const read = async (req, res) => {
  const agents = await Agent.find()
    .select('-password')
    .select('-__v')

  if (agents >= 0) return Response._404(res, req, 'No agents stored')

  Response._200(res, req, agents)
}

/**
 *
 * @route GET api/v1/agent/:agentID
 * @description Get one agent
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const single = async (req, res) => {
  const { agentID } = req.params

  try {
    const agent = await Agent
      .findById(agentID)
      .select('-password')

    Response._200(res, req, agent)
  } catch (error) {
    Response._404(res, req, 'No agent found')
  }
}

/**
 *
 * @route POST api/v1/agents/register
 * @description Register a new agent
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const register = async (req, res) => {
  const { username, password, email } = req.body

  if (!username || !email || !password) {
    return Response._400(res, req, 'Invalid request payload')
  }

  const agent = await Agent.findOne({ email })
  if (agent) return Response._409(res, req, 'Agent exist, Email must be unique')

  try {
    const newAgent = new Agent(req.body)
    await newAgent.save()

    newAgent.password = undefined
    newAgent.__v = undefined
    Response._201(res, req, 'Successful registration', newAgent)
  } catch (error) {
    Response._500(res, req, `Unsuccessful Registration: ${error}`)
  }
}

/**
 *
 * @route POST api/v1/agents/login
 * @description Try to login agent and respond with token
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return Response._400(res, req, 'Please enter all fields')
  }

  const agent = await Agent.findOne({ username })
  if (!agent) return Response._400(res, req, 'Login failed')

  const result = await agent.comparePassword(password)

  if (result && agent) {
    const token = await sign(agent)
    Response._200(res, req, token)
  } else {
    return Response._401(res, req, 'Invalid credentials')
  }
}

/**
 *
 * @route PATCH api/v1/agents/:agentID
 * @description Update agent
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const update = async (req, res) => {
  const { agentID } = req.params
  const updated = {}

  for (const ops of req.body) {
    if (ops.propName === 'password' || ops.propName === '_id') {
      return Response._403(res, req, 'Not allowed')
    }
    updated[ops.propName] = ops.value
  }

  try {
    const update = await Agent.updateOne({ _id: agentID }, { $set: updated })
    if (update.nModified) {
      Response._200(res, req, agentID)
    } else {
      Response._400(res, req, 'Fail to update agent')
    }
  } catch (error) {
    console.log(error)
    Response._500(res, req, `Unsuccessful update: ${error}`)
  }
}

/**
 *
 * @route Delete api/v1/agents/:agentID
 * @description Delete one agent
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const remove = async (req, res) => {
  const { agentID } = req.params

  try {
    const deleteAgent = await Agent.deleteOne({ _id: agentID })
    await Player.deleteMany({ owner: agentID })
    if (deleteAgent.deletedCount) {
      Response._200(res, req, 'Agent deleted')
    } else {
      Response._404(res, req, 'No agent to delete')
    }
  } catch (error) {
    Response._500(res, req, `Unsuccessful delete: ${error}`)
  }
}

module.exports = {
  read,
  single,
  register,
  login,
  update,
  remove
}
