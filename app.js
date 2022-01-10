// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res ) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res ) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  // 不知為何，使用redirect會發生 [nodemon] app crashed - waiting for file changes before starting...
  // if (!req.query.keyword) {
  //   res.redirect('/')
  // }
  const keyword = req.query.keyword.trim()
  const restaurant = restaurantList.results.filter(movie => {
    return (movie.name.toLowerCase().includes(keyword.toLowerCase()) | movie.category.toLowerCase().includes(keyword.toLowerCase()))
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})