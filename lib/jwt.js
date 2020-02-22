const jwt = require('jsonwebtoken')

const sign = user => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) return reject(error)
        return resolve(token)
      }
    )
  })
}

module.exports = {
  sign
}
