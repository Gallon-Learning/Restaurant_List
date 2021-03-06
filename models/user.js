// require packages used in the project
const mongoose = require('mongoose')

// setting schema and table columns
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// export
module.exports = mongoose.model('User', userSchema)
