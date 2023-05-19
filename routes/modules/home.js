const express = require('express')
const router = express.Router()
const expenseInfo = require('../../models/expense')
const categoryInfo = require('../../models/category')
const { getCategoryInfo } = require('../utils/accountingItem')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    let totalAmount = 0

    const expenseLList = await expenseInfo.find({ userId }).lean()

    expenseLList.forEach((expenseItem) => {
      totalAmount += expenseItem.amount
      if (expenseItem.date) {
        expenseItem.date = expenseItem.date.toLocaleDateString()
      }
    })

    res.render('index', { expenseLList, totalAmount })
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/:searchItem', (req, res) => {
  const userId = req.user._id
  const searchItem = req.params.searchItem
  const { categoryClass, itemName } = getCategoryInfo(searchItem)
  let totalAmount = 0

  return expenseInfo
    .find({ userId, categoryClass })
    .lean()
    .then((expense) => {
      expense.map((eachExpense) => {
        totalAmount += eachExpense.amount
        if (eachExpense['expenseDate'] == undefined) {
          const eachExpenseDate = eachExpense.date.toLocaleDateString()
          eachExpense['expenseDate'] = eachExpenseDate
        }
      })
      return expense
    })
    .then((expense) => {
      res.render('index', { expense, totalAmount, item: itemName })
    })
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
