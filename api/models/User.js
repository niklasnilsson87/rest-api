const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true }
})

// validates that the password is at least 6 characters long
UserSchema.path('password').validate((password) => { return password.length >= 6 },
  'The password must be of minimum length 6 characters.')

// Hash the password
UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password') || user.isNew) {
    const hashPwd = await bcrypt.hash(user.password, 12)
    user.password = hashPwd
  }
  next()
})

// method that checks if password match
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Creates model
const User = mongoose.model('User', UserSchema)

// Exports
module.exports = User
