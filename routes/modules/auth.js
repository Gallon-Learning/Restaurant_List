// require packages used in the project
const express = require('express')
const router = express.Router()
const passport = require('passport')

// setting routes
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// export
module.exports = router
