const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  origin: {
    type: String,
    required: true,
    lowercase: true
  },
  club: {
    type: String,
    required: false,
    default: 'No club'
  },
  position: {
    type: String,
    required: true,
    lowercase: true
  },
  contractTo: {
    type: String,
    required: false,
    default: 'Free agent'
  }
})

const Player = mongoose.model('Player', PlayerSchema)

// Exports
module.exports = Player
