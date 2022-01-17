// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res ) => {
  Restaurant.find()
    .lean()
    .then((restaurantsData) => res.render('index', {restaurantsData}))
})

app.get('/restaurants/:id', (req, res ) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurantsData) => res.render('show', { restaurantsData }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.trim()
  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword.toLowerCase()) ||
          data.category.toLowerCase().includes(keyword.toLowerCase())
      )
      res.render("index", { restaurantsData: filterRestaurantsData, keyword })
    })
    .catch(err => console.log(err))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})