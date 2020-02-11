const User = require('../models/User')
const { sign } = require('../lib/jwt')

const read = async (req, res, next) => {
  const users = await User.find({}).select('-password').select('-__v')

  res.status(200).json({ users: users })
}

const register = async (req, res, next) => {
  const { username, password, email } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' })
  }

  const user = await User.findOne({ email })

  if (user) return res.status(400).json({ message: 'User exist' })

  try {
    const newUser = new User({
      username,
      password,
      email
    })

    await newUser.save()
    res.status(201).json({ message: 'Successful Registration' })
  } catch (error) {
    res.status(500).json({ message: `Unsuccessful Registration: ${error}` })
  }
}

const login = async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).json({ message: 'Please enter all fields' })

  const user = await User.findOne({ username })
  if (!user) return res.status(400).json({ message: 'Login failed' })

  const result = await user.comparePassword(password)

  if (result && user) {
    const token = await sign(user)
    res.status(200).json({ message: 'Successful login', token: token })
  } else {
    return res.status(400).json({ message: 'Invalid credentials' })
  }
}

module.exports = {
  read,
  register,
  login
}
