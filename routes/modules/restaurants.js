// require packages used in the project
const express = require('express')
const router = express.Router()

// require relative js files
const Restaurant = require('../../models/restaurant')

// setting routes
// adding new restaurant page
router.get('/new', (req, res) => {
  res.render('new')
})
// submitting new restaurant
router.post('/', (req, res) => {
  const restaurantNew = req.body
  restaurantNew.userId = req.user._id
  return Restaurant.create(restaurantNew)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// view restaurant's detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({ _id, userId })
    .lean()
    .then((restaurantsData) => res.render('show', { restaurantsData }))
    .catch(error => console.log(error))
})
// edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({ _id, userId })
    .lean()
    .then((restaurantsData) => res.render('edit', { restaurantsData }))
    .catch(error => console.log(error))
})
// submitting edit page
router.put('/:id', (req, res) => {
  const _id = req.params.id
  Restaurant.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})
// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// export
module.exports = router
