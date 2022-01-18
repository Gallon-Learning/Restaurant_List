// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')

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
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
// 使用者可以瀏覽全部所有餐廳
app.get('/', (req, res ) => {
  Restaurant.find()
    .lean()
    .then((restaurantsData) => res.render('index', {restaurantsData}))
})

// 使用者可以搜尋餐廳
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

// 使用者可以新增一家餐廳
app.get('/restaurants/new', (req, res) => {
  res.render("new")
})

app.post('/restaurants', (req, res) => {
  const restaurant = req.body
  return Restaurant.create({
      'id': restaurant.id,
      'name': restaurant.name,
      'name_en': restaurant.englishName,
      'category': restaurant.category,
      'image': restaurant.image,
      'location': restaurant.location,
      'phone': restaurant.phone,
      'google_map': restaurant.googleMap,
      'rating': restaurant.rating,
      'description': restaurant.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 使用者可以瀏覽一家餐廳的詳細資訊
app.get('/restaurants/:id', (req, res ) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurantsData) => res.render('show', { restaurantsData }))
    .catch(error => console.log(error))
})

// 使用者可以修改一家餐廳的資訊
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurantsData) => res.render('edit', { restaurantsData }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const restaurantEdit = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.id = restaurantEdit.id
      restaurant.name = restaurantEdit.name
      restaurant.name_en = restaurantEdit.englishName
      restaurant.category = restaurantEdit.category
      restaurant.image = restaurantEdit.image
      restaurant.location = restaurantEdit.location
      restaurant.phone = restaurantEdit.phone
      restaurant.google_map = restaurantEdit.googleMap
      restaurant.rating = restaurantEdit.rating
      restaurant.description = restaurantEdit.description
      return restaurant.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})