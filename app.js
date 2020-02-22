const express = require('express')
const logger = require('morgan')
const mongoose = require('./config/mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()

mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/api', require('./api/routes/root'))
app.use('/api/v1/users', require('./api/routes/v1/users'))
app.use('/api/v1/players', require('./api/routes/v1/players'))

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      requested: req.headers.host + req.originalUrl
    }
  })
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`))
