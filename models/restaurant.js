// require packages used in the project
const mongoose = require('mongoose')

// setting schema and table columns
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }
})

// export
module.exports = mongoose.model('Restaurant', restaurantSchema)
