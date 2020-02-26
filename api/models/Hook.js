const mongoose = require('mongoose')

const HookSchema = new mongoose.Schema({
  agent: {
    type: String,
    required: true
  },
  callbackUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}
)

const Hook = mongoose.model('Hook', HookSchema)

module.exports = Hook
