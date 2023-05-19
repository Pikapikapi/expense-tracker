const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')
const categoryInfo = require('../../models/category')
const { getCategoryInfo, getCategoryOptions } = require('../utils/accountingItem')

router.get('/new', (_req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const userId = req.user._id

  const category = req.body.category

  return categoryInfo
    .find({ name: `${category}` })
    .lean()
    .then((categoryContent) => {
      const categoryClass = categoryContent[0].iconClass
      return expenseInfo.create({
        name: `${req.body.name}`,
        date: `${req.body.date}`,
        amount: `${req.body.amount}`,
        userId,
        categoryClass,
      })
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return expenseInfo
    .findOne({ _id, userId })
    .lean()
    .then((expense) => {
      if (expense.date) {
        expense.date = expense.date.toLocaleDateString()
      }
      res.render('edit', { expense, _id, categoryOptions: getCategoryOptions(expense.categoryClass) })
    })
    .catch((error) => console.log(error))
})

router.put('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return categoryInfo
    .findOne({ name: req.body.category })
    .then((category) => {
      return expenseInfo.findOne({ _id, userId }).then((expense) => {
        expense.name = req.body.name
        expense.date = req.body.date
        expense.amount = req.body.amount
        expense.categoryClass = category.iconClass
        return expense.save()
      })
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

router.delete('/:id/delete', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return expenseInfo
    .findOne({ _id, userId })
    .then((expense) => expense.deleteOne())
    .then(() => res.redirect('/'))
})

module.exports = router
