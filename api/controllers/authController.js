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

module.exports = {
  read,
  register,
  login
}
