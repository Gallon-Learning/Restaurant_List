const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
db.once('open', () => {
    restaurantList.forEach(restaurant => {
        Restaurant.create(restaurant)
    })
    console.log('done')
})