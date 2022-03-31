// require packages used in the project
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

// require relative js files
const User = require('../../models/user')

// setting routes
// login page
router.get('/login', (req, res) => {
  res.render('login')
})
// submitting login page
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  const errors = []
  if (!email || !password) {
    errors.push({ message: 'Both email and passport are required!' })
  }
  if (errors.length) {
    return res.render('login', {
      errors,
      email
    })
  }
  next()
},passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))
// register page
router.get('/register', (req, res) => {
  res.render('register')
})
// submitting register page
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Email與密碼都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    // if registered, return register page
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // if not registered, write into db
    return bcrypt
      .genSalt(10) // generate salt, setting complicated number 10
      .then(salt => bcrypt.hash(password, salt)) // add salt into passport, generate hash
      .then(hash => User.create({
        name,
        email,
        password: hash // use hash to replace original passport
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})
// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

// export
module.exports = router
