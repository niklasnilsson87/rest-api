const User = require('../models/User')
const Player = require('../models/Player')
const { sign } = require('../../lib/jwt')
const Response = require('../responses/Response')

/**
 *
 * @route GET api/v1/users
 * @description Get all registered users
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const read = async (req, res) => {
  const users = await User.find()
    .select('-password')
    .select('-__v')

  if (users >= 0) return Response._404(res, 'No users stored')

  Response._200(res, req, users)
}

/**
 *
 * @route GET api/v1/user/:userID
 * @description Get one user
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const single = async (req, res) => {
  const { userID } = req.params

  try {
    const user = await User
      .findById(userID)
      .select('-password')

    Response._200(res, req, user)
  } catch (error) {
    Response._404(res, 'No user found')
  }
}

/**
 *
 * @route POST api/v1/users/register
 * @description Register a new user
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const register = async (req, res) => {
  const { username, password, email } = req.body

  if (!username || !email || !password) {
    return Response._400(res, 'Invalid request payload')
  }

  const user = await User.findOne({ email })
  if (user) {
    return Response._400(res, 'User exist, Email must be unique')
  }

  try {
    const newUser = new User(req.body)

    await newUser.save()
    Response._201(res, 'Successful registration', newUser)
  } catch (error) {
    Response._500(res, `Unsuccessful Registration: ${error}`)
  }
}

/**
 *
 * @route POST api/v1/users/login
 * @description Try to login user and respond with token
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return Response._400(res, 'Please enter all fields')
  }

  const user = await User.findOne({ username })
  if (!user) return Response._400(res, 'Login failed')

  const result = await user.comparePassword(password)

  if (result && user) {
    const token = await sign(user)
    Response._200(res, 'Successful login', token)
  } else {
    return Response._401(res, 'Invalid credentials')
  }
}

/**
 *
 * @route PATCH api/v1/users/:userID
 * @description Update user
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const update = async (req, res) => {
  const { userID } = req.params
  const updated = {}

  for (const ops of req.body) {
    if (ops.propName === 'password' || ops.propName === '_id') {
      return Response._403(res, req, 'Not allowed')
    }
    updated[ops.propName] = ops.value
  }

  try {
    const update = await User.updateOne({ _id: userID }, { $set: updated })
    if (update.nModified) {
      Response._200(res, req, userID)
    } else {
      Response._400(res, req, 'Fail to update user')
    }
  } catch (error) {
    console.log(error)
    Response._500(res, req, `Unsuccessful update: ${error}`)
  }
}

/**
 *
 * @route Delete api/v1/users/:userID
 * @description Delete one user
 * @access Private
 * @param {Object} req
 * @param {Object} res
 */
const remove = async (req, res) => {
  const { userID } = req.params

  try {
    const deleteUser = await User.deleteOne({ _id: userID })
    await Player.deleteMany({ owner: userID })
    if (deleteUser.deletedCount) {
      Response._202(res, req, 'User deleted')
    } else {
      Response._404(res, req, 'No user to delete')
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
