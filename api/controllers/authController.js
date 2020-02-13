const User = require('../models/User')
const { sign } = require('../../lib/jwt')

/**
 *
 * @route GET api/v1/users
 * @description Get all registered users
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const read = async (req, res) => {
  const users = await User.find().select('-password').select('-__v')
  if (users >= 0) return res.status(404).json({ message: 'No users stored' })
  res.status(200).json({ users: users })
}

/**
 *
 * @route GET api/v1/user/:userID
 * @description Get one user
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const single = async (req, res) => {
  const { userID } = req.params

  try {
    const user = await User.findById(userID).select('-password')
    res.status(200).json({
      method: req.method,
      message: 'User found',
      user: user
    })
  } catch (error) {
    res.status(404).json({
      method: req.method,
      message: 'No users Found'
    })
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

  if (!username || !email || !password) return res.status(400).json({ message: 'Please enter all fields' })

  const user = await User.findOne({ email })
  if (user) return res.status(400).json({ message: 'User exist, Email must be unique' })

  try {
    const newUser = new User(req.body)

    await newUser.save()
    res.status(201).json({ message: 'Successful Registration' })
  } catch (error) {
    res.status(500).json({ message: `Unsuccessful Registration: ${error}` })
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

  if (!username || !password) return res.status(400).json({ message: 'Please enter all fields' })

  const user = await User.findOne({ username })
  if (!user) return res.status(400).json({ message: 'Login failed' })

  const result = await user.comparePassword(password)

  if (result && user) {
    const token = await sign(user)
    res.status(200).json({ message: 'Successful login', token: token })
  } else {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}

/**
 *
 * @route PATCH api/v1/users/:userID
 * @description Update user
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const update = async (req, res) => {
  const { userID } = req.params
  const updated = {}

  for (const ops of req.body) {
    console.log(ops)
    if (ops.propName === 'password' || ops.propName === '_id') {
      return res.status(403).json({
        method: req.method,
        message: 'Not allowed',
        id: userID
      })
    }
    updated[ops.propName] = ops.value
  }

  try {
    const update = await User.updateOne({ _id: userID }, { $set: updated })
    if (update.nModified) {
      res.status(200).json({
        method: req.method,
        message: 'Updated user',
        id: userID
      })
    } else {
      res.status(400).json({
        method: req.method,
        message: 'Fail to update user',
        id: userID
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
 * @route Delete api/v1/users/:userID
 * @description Delete one user
 * @access Public
 * @param {Object} req
 * @param {Object} res
 */
const remove = async (req, res) => {
  const { userID } = req.params

  try {
    const deleteUser = await User.remove({ _id: userID })
    if (deleteUser.deletedCount) {
      res.status(200).json({
        message: 'Deleted User',
        id: userID
      })
    } else {
      res.status(404).json({
        message: 'No user to delete',
        id: userID
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
  single,
  register,
  login,
  update,
  remove
}
