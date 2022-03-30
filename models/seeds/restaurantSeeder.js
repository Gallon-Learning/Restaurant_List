// require packages used in the project
const bcrypt = require('bcryptjs')

// use environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require relative js files
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

// require and set seed data
const restaurantList = require('../../restaurant.json').results
const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

// put seed data into db
db.once('open', () => {
  const userPromises = []
  SEED_USERS.forEach(function (seedUser) {
    userPromises.push(
      User.findOne({ email: seedUser.email })
        .then(user => {
          if (user) {
            console.log('Seed User already exists.')
            return user
          } else {
            return bcrypt
              .genSalt(10)
              .then(salt => bcrypt.hash(seedUser.password, salt))
              .then(hash => User.create({
                name: seedUser.name,
                email: seedUser.email,
                password: hash
              }))
          }
        })
        .then(user => {
          const restaurantListSub = restaurantList.filter(function (restaurant) {
            if (user.email === 'user1@example.com') {
              return restaurant.id <= 3
            } else {
              return restaurant.id >= 4 && restaurant.id <= 6
            }
          })
          const restaurantPromises = []
          restaurantListSub.forEach(function (restaurant) {
            restaurant.userId = user._id
            restaurantPromises.push(
              Restaurant.create(restaurant)
            )
          })
          return Promise.all(restaurantPromises)
        })
    )
  })
  Promise.all(userPromises)
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
