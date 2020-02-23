const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const bcrypt = require('bcrypt')

const AgentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}
)

// validates that the password is at least 6 characters long
AgentSchema.path('password').validate((password) => { return password.length >= 6 },
  'The password must be of minimum length 6 characters.')

// Hash the password
AgentSchema.pre('save', async function (next) {
  const agent = this

  if (agent.isModified('password') || agent.isNew) {
    const hashPwd = await bcrypt.hash(agent.password, 12)
    agent.password = hashPwd
  }
  next()
})

AgentSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const Agent = mongoose.model('Agent', AgentSchema)

module.exports = Agent
