// require packages used in the project
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

// use environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require relative js files
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

// setting
const app = express()
const PORT = process.env.PORT
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // setting success_msg
  res.locals.warning_msg = req.flash('warning_msg') // setting warning_msg
  res.locals.error_msg = req.flash('error_msg') // setting warning_msg
  next()
})

// setting routes
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
