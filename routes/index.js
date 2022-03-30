// require packages used in the project
const express = require('express')
const router = express.Router()

// require relative js files
const home = require('./modules/home')
const users = require('./modules/users')
const restaurants = require('./modules/restaurants')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

// setting routes
router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/auth', auth)
router.use('/', authenticator, home)

// export
module.exports = router
