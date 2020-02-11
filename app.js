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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v1/users', require('./routes/api/v1/users'))

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`))
