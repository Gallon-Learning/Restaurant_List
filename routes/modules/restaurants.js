const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Setting home page routers
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const restaurantNew = req.body
  restaurantNew.userId = req.user._id
  return Restaurant.create(restaurantNew)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 使用者可以瀏覽一家餐廳的詳細資訊
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({ _id, userId })
    .lean()
    .then((restaurantsData) => res.render('show', { restaurantsData }))
    .catch(error => console.log(error))
})

// 使用者可以修改一家餐廳的資訊
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({ _id, userId })
    .lean()
    .then((restaurantsData) => res.render('edit', { restaurantsData }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  Restaurant.findByIdAndUpdate(_id, req.body)
    // 可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// 使用者可以刪除一家餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
